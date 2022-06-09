import Graphiics from "../../components/pizzaGraphic";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/dashboard';


 class Dashboard extends Component {
    componentDidMount() {
      this.getDashboard();
     
        
    };
    getDashboard(){
        
        this.props.getDash();
        const {dashboard} = this.props;
        if (dashboard === "undefined") return null;
    }

    componentDidUpdate(nextProps) {
        if (!this.props.teste && nextProps.teste) this.getDadosDashboard();
    }

    
    render(){
        var dashboard = [];
        if (this.props.dashboard) dashboard = this.props.dashboard
        return (
            <>
                <Graphiics dados = {dashboard}/>
            </>
        );
    }
}
const mapStateToProps = state => ({
    dashboard: state.dash.dashboard,
    
})
export default connect(mapStateToProps, actions)(Dashboard);