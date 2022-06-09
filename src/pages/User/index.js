import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { Link } from 'react-router-dom';
import {  UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';


import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);


class User extends Component {

    state = {
        pageAtual: 1,
        //limit: 40,
    }

    componentDidMount() {
        this.getUsuarios();
    }

    componentDidUpdate(nextProps) {
        if (!this.props.usuario && nextProps.usuario) this.getUsuarios();
    }

    getUsuarios() {
       
        this.props.getUsers();
        const { usuarios } = this.props;
        if (usuarios === "undefined") return null;
    }

    changePageAtual = (pageAtual) => {
        this.setState({pageAtual}, () => {
            this.getUsuarios();
        })
    }

    render() {
        var usuarios = [];
        if (this.props.usuarios) usuarios = this.props.usuarios
        

        
        
        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Listar Usuários</h2>
                    </div>
                </div><hr />
                <div className="row mb-3">
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th className="d-none d-sm-table-cell">ID</th>
                                    <th>Nome</th>
                                    <th className="d-none d-sm-table-cell">name_fazenda</th>
                                    <th className="d-none d-sm-table-cell">cpf_cnpj</th>
                                    <th className="d-none d-sm-table-cell">testess</th>
                                    <th className="d-none d-sm-table-cell">hectares</th>
                                    <th className="d-none d-sm-table-cell">area_agricultavel</th>
                                    <th className="d-none d-sm-table-cell">area_vegetacao</th>
                                    <th className="text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(producers => (
                                    <tr key={producers.id}>
                                        <td className="d-none d-sm-table-cell">{producers.id}</td>
                                        <td>{producers.name}</td>
                                        <td className="d-none d-sm-table-cell">{producers.name_fazenda}</td>
                                        <td className="d-none d-sm-table-cell">{producers.cpf_cnpj}</td>
                                        <td className="d-none d-sm-table-cell">{producers.testess}</td>
                                        <td className="d-none d-sm-table-cell">{producers.hectares}</td>
                                        <td className="d-none d-sm-table-cell">{producers.area_agricultavel}</td>
                                        <td className="d-none d-sm-table-cell">{producers.area_vegetacao}</td>
                                        <td className="text-center">
                                            <span className="d-none d-md-block">
                                                <Link to={"/view-user/" + producers.id}>
                                                    <button className="btn btn-outline-primary btn-sm mr-1">
                                                        <FontAwesomeIcon icon="eye" />
                                                    </button>
                                                </Link>

                                                <Link to={"/update-user/" + producers.id}>
                                                    <button className="btn btn-outline-warning btn-sm mr-1">
                                                        <FontAwesomeIcon icon="edit" />
                                                    </button>
                                                </Link>

                                                <span onClick={() => this.openModal(producers.id)}>
                                                </span>
                                            </span>
                                            <div className="dropdown d-block d-md-none">
                                                <UncontrolledButtonDropdown>
                                                    <DropdownToggle outline color="primary" size="sm" caret>
                                                        Ações
                                                    </DropdownToggle>
                                                    <DropdownMenu>
                                                        <Link className="dropdown-item" to={"/view-user/" + producers.id}>Visualizar</Link>
                                                        <Link className="dropdown-item" to={"/update-user/" + producers.id}>Editar</Link>
                                                        <DropdownItem onClick={() => this.openModal(producers.id)}>Apagar</DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledButtonDropdown>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <nav aria-label="paginacao">
                    <ul className="pagination pagination-sm justify-content-center">
                        
                        <li>
                            <span className="page-link" onClick={() => this.changePageAtual(1)}>1</span>
                        </li>

                        <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(2) }>2</span></li> 

                           <li className="page-item"><span className="page-link" onClick={() => this.changePageAtual(3)}>3</span></li> 

                        <li >
                            <span className="page-link" onClick={() => this.changePageAtual(4)}>4</span>
                        </li>
                        
                        <li >
                            <span className="page-link" onClick={() => this.changePageAtual(5)}>5</span>
                        </li>
                    </ul>
                </nav>

            </>
        )
    }
}

const mapStateToProps = state => ({
    usuarios: state.user.users,
    usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(User);