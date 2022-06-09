import React from 'react';
import BaseLogin from './BaseLogin';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

const baseLogin = Component => {
    class ComponentBaseLogin extends React.Component{

        componentDidMount(){
            const {logado, getUser, history} = this.props;
           
            if(logado) return history.replace("/dashboard");
        }

        componentDidUpdate(nextProps){
            const {history} = this.props;
            if( !nextProps.logado) return history.replace("/dashboard");
        }
        
        render(){
            return(
                <BaseLogin>
                    <Component { ...this.props} />
                </BaseLogin>
            );
        }
    }

    const mapStateToProps = state => ({
        logado: state.auth.logado,
        usuario: state.auth.usuario
    });

    return connect(mapStateToProps, actions)(ComponentBaseLogin);
}

export default baseLogin;