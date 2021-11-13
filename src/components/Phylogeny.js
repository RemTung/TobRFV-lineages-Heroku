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
 
const newick = '(((A:0.2, B:0.3):0.3,(C:0.5, D:0.3):0.2):0.3, E:0.7):1.0;';
const hooks = [useLeafSubtree, useAutoResize];  
 
function Phylogeny(props) {
  const [highlighted, setHighlighted] = useState(['A']);
  const [subtreeID, setSubtreeID] = useState('');
  const [leafs, setLeafs] = useState(['']);
 
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
 
  return (    
    <div>
      <h3>Phylogenetic Tree</h3>
      <div className="containerToBeFilledWithCanvas">
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
  )
}

export default Phylogeny;