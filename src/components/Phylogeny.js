// see https://npm.runkit.com/react-phylogeny-tree for help

import React, {useState} from 'react';
 
// import scaleBarPlugin from '@mkoliba/phylogeny-tree-plugin-scalebar';
import PhylogenyTree from 'react-phylogeny-tree';
import {
  createOnSelectPlugin,
  createOnViewSubtreePlugin,
  createOnRedrawReRootTreePlugin,
} from 'react-phylogeny-tree/lib/plugins';
import {useLeafSubtree, useAutoResize} from 'react-phylogeny-tree/lib/hooks';
import 'react-phylogeny-tree/lib/css/zoom.css'; // in next.js css imports might need to go to pages/_app.js
import '@mkoliba/phylogeny-tree-plugin-context-menu/styles.css';
import '@mkoliba/phylogeny-tree-plugin-interactions/styles.css';
import { toast } from 'react-toastify';
 
const hooks = [useLeafSubtree, useAutoResize];  
 
function Phylogeny(props) {
  const [highlighted, setHighlighted] = useState(['A']);
  const [subtreeID, setSubtreeID] = useState('');
  const [leafs, setLeafs] = useState(['']);
  const [newick, setNewick] = useState('((39563361_B:0.1047082675454476,39563361_A:0.1047082675454476):9.825475780266288,(MK648157:2.1044224681927517,(KT383474:1.147240091945605,MK133093:4.4374522753814745):0.24739455968324364,((MK165457:3.3292265571526514,KX619418:0):0.6327441579883271,((MK133095:2.201726240119342,MN167466:2.201726240119342):1.3389662039392078,(39070110_C:0.6165516258129173,(33610411:0.4848038862071462,(39941596_A:0.32340692014486194,(39070014_B:0.1047082675454476,39070014_A:0.1047082675454476):0.21596080181234356):0.24627034046329754,(38887559_C:0.30298419441237456,(38887559_B:0.1047082675454476,38887559_A:0.1047082675454476):0.19827592686692697):0.24205240911169312,(((39941596_B-2:0.1047082675454476,39941596_B-1:0.1047082675454476):0.21329268493354903,(39055711_B:0.12891909745371777,(39963015_A:0.1047082675454476,39963015_B:0.1047082675454476):0.02421082990827017):0.18634400423820807):0.1701815412425276,((38890029_A:0.1047082675454476,38890029_B:0.1047082675454476):0.18925072796082532,(39055711_A:0.1318960705120844,(39070110_A:0.12387322305539783,39070110_B:0.12387322305539783):0.02718780296663681):0.18122788050413874):0.1723206919182303):0.08149476688663526):0.030447260481878402):4.025441297369525):1.007178339528764,((39070030_B:0.1047082675454476,39070022_A:0.1047082675454476,39070022_B:0.1047082675454476,39070030_A:0.1047082675454476):5.235854702105826,(MK319944:3.3890110995935174,((39563388_A:0.1047082675454476,39563388_B:0.1047082675454476):0.7162470662749456,(36132638_A:0.5761123329095881,(39941641_B-1:0.32147142201552015,39941625_A:0.32147142201552015,(39962055_A:0.1047082675454476,39962055_B:0.1047082675454476):0.233190259192952,(39941430_B:0.1047082675454476,39941430_A:0.1047082675454476):0.21676315447007255):0.2573787616811387):0.24758085169787591,((39070153_E:0.49381924036174496,(33993176:0.07708834341838156,39976860:0.07708834341838156):0.3784009859236903):0.08044564082888428,((39058293_B:0.1047082675454476,39058293_A:0.1047082675454476):0.4152773554583291,(39941641_A-1:0.3586828105856057,((39070153_B:0.1047082675454476,39070153_D:0.1047082675454476):0.10798040090617178,(39070153_C:0.1047082675454476,39070153_A:0.1047082675454476):0.10798040090617178):0.1377805897725466):0.18320561871519203):0.04059000425127124):0.2439526018424658,(39941617_A:0.5824551293635523,(38886257_A:0.44807454472561403,38886177_B:0.44807454472561403,(38886230_B:0.1047082675454476,38886230_A:0.1047082675454476):0.34336627718016643,(39941641_A-2:0.1047082675454476,39941641_B-2:0.1047082675454476):0.370744785051329,(39941668_A:0.12104184253848871,39941668_B:0.12104184253848871):0.3544112100582879,(MN182533:0,(39962442_B:0.1047082675454476,39962442_A:0.1047082675454476):0.2320473792717621):0.1386974057795669):0.10700207676677564):0.24397590603098251):3.8993357110161924):0.6065826708791064):0.3003947406984935):0.3039849494925875):4.015357746627842):0;');

  // memoized props, so they are not recreated on every render and pass on ref. equality
  const options = React.useMemo(
    () => ({
      selectedIds: highlighted,
      leafSubtree: { leafID: subtreeID, noLevels: 1, minLeafToRootLength: 0 },
      tooltipContent: (node) => {
        return `id: ${node.id}<br>
          branch length: ${node.branchLength}`;
      },
    }),
    [highlighted, subtreeID]
  );
  const plugins = React.useMemo(() => {
    return [
      // scaleBarPlugin,
      createOnSelectPlugin((tree, selectedIds) => {
        setHighlighted(selectedIds);
      }),
      createOnViewSubtreePlugin((tree, leafsInTree) => {
        setSubtreeID(null)
        setLeafs(leafsInTree);
      }),
      createOnRedrawReRootTreePlugin((tree, leafsInTree) => {
        setSubtreeID(null)
        setLeafs(leafsInTree);
      })
    ];
  }, []);
 
const handleUpdate = () => {
  fetch('http://localhost:7000/tree')
  .then(res => { return res.text() })
  .then(result => {
    if (result === '') {
      toast.error('No update available');
    } else {
      setNewick(result);
      toast.success('Update complete');
    }
  })
}

  return (    
    <div className="container">
      <h3>Phylogenetic Tree</h3>
      <a href="http://localhost:4000"
         type="button" 
         className="btn btn-success btn-block">
            Visualize with Auspice
      </a>
      <div> 
        <button type="button" 
                className="btn btn-primary btn-block"
                onClick={handleUpdate}>
          Update tree
        </button>
      </div>

      <div className="row">
        <div>
        <PhylogenyTree 
            newick={newick}
            options={options}
            hooks={hooks}
            plugins={plugins}
            interactive={true}
            zoom
          />
        </div>
      </div>

    </div>
  )
}

export default Phylogeny;