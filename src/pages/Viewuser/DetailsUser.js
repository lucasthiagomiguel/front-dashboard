import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import {Spinner} from 'reactstrap';

class DetailsUser extends Component {

    renderInfoUser() {
        if (!this.props.userDetails) return null;
        console.log(this.props.userDetails)
        return (
            <dl className="row">

                <dt className="col-sm-3">ID</dt>
                <dd className="col-sm-9">{ this.props.userDetails.id}</dd>

                <dt className="col-sm-3">Nome</dt>
                <dd className="col-sm-9">{ this.props.userDetails.name }</dd>

                <dt className="col-sm-3">nome fazenda</dt>
                <dd className="col-sm-9">{this.props.userDetails.name_fazenda }</dd>

                <dt className="col-sm-3">cpf_cnpj</dt>
                <dd className="col-sm-9">{this.props.userDetails.cpf_cnpj }</dd>

                <dt className="col-sm-3">estado</dt>
                <dd className="col-sm-9">{this.props.userDetails.estado }</dd>

                <dt className="col-sm-3">hectares</dt>
                <dd className="col-sm-9">{this.props.userDetails.hectares }</dd>

                <dt className="col-sm-3">area agricultavel</dt>
                <dd className="col-sm-9">{this.props.userDetails.area_agricultavel }</dd>        

                <dt className="col-sm-3">area vegetacao</dt>
                <dd className="col-sm-9">{this.props.userDetails.area_vegetacao }</dd>   

                <dt className="col-sm-3">plantacao</dt>
                <dd className="col-sm-9">{this.props.userDetails.plantacao }</dd>     

                <dt className="col-sm-3">total fazenda</dt>
                <dd className="col-sm-9">{this.props.userDetails.total_fazenda }</dd>     

                <dt className="col-sm-3">ativo</dt>
                <dd className="col-sm-9">{this.props.userDetails.ativo }</dd>     


            </dl>
        )
    }

    render() {
        return (
            <>
                {this.props.userDetails ? "" : <div className="d-flex justify-content-center"><Spinner color="primary" /></div>}
                {this.renderInfoUser()}
            </>
        )
    }
}

const mapStateToProps = state => ({
    userDetails: state.user.userDetails,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetailsUser);