// see https://www.phylocanvas.gl/examples/react-js-tree-component.html for help

import React, { Component } from 'react'
import PhylocanvasGL from "@phylocanvas/phylocanvas.gl";
import details from '../data/details';

class PhylocanvasTree extends Component {

  static displayName = "Phylocanvas";

  canvasRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {highlighted: null,
                  detail: <p className="detail">Double click a node to view detailed information!</p>};
    this.handleSelectNode = this.handleSelectNode.bind(this);
  }

  componentDidMount() {
    this.tree = new PhylocanvasGL(
      this.canvasRef.current,
      this.props || {},
    );
  }

  componentDidUpdate() {
    this.tree.setProps(this.props);
  }

  componentWillUnmount() {
    this.tree.destroy();
  }

  handleSelectNode() {
    this.setState({highlighted: this.tree.getHighlightedNode()});
    if (!this.state.highlighted) return;
    const id = this.state.highlighted.id;
    this.tree.setProps({selectedIds: [id]});
    const node = details.find(x => x.strain === id);
    if (!node) {
      this.setState({detail: <p className="detail">No details available</p>});
    } else {
      this.setState({detail: 
                      <p className="detail">
                        id: {id}<br></br>
                        date: {node.date}<br></br>
                        continent: {node.continent}<br></br>
                        country: {node.country}<br></br>
                        host: {node.host}<br></br>
                        company type: {node.company_type}<br></br>
                        municipality: {node.municipality}<br></br>
                        state: {node.state}<br></br>
                      </p>});
    }
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10" ref={this.canvasRef} onClick={this.handleSelectNode}/>
          &nbsp;
          &nbsp;
          <div className="col-3">
            <h3>View details</h3>
            {this.state.detail}
          </div>
        </div>
      </div>

    );
  }
}

export default PhylocanvasTree;