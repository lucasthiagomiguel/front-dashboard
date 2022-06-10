import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';

import { Form, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle,Row,Col } from 'reactstrap';
import SpinnerUp from '../../components/SpinnerUp';
import SpinnerDeleteSimples from '../../components/SpinnerDeleteSimples';
import validator from 'validator';
import AlertDanger from '../../components/AlertDanger';
import AlertSuccess from '../../components/AlertSuccess';

class UpdateUser extends Component {

    state = {
        name: "",
        name_fazenda: "",
        cpf_cnpj: "",
        estado: "",
        hectares:"",
        area_agricultavel:"",
        area_vegetacao:"",
        plantacao:"",
        success: "",
        erro: "",
        loading: false,
        dadosApi:false,
        openModal: false,
        formSuccess: false,
        deleteSuccess: false,
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getViewUser(id);
    }

    async componentDidUpdate(nextProps) {
        const { id } = this.props.match.params;
        if (!this.props.usuario && nextProps.usuario) this.props.getViewUser(id);
        await this.receberDadosApi();
    }

    componentWillUnmount() {
        //this.props.limparUser();
    }

    receberDadosApi() {
        
        
        if (!this.state.dadosApi) {
            this.setState({ id: this.props.userDetails.id });
            this.setState({ name: this.props.userDetails.name });
            this.setState({ name_fazenda: this.props.userDetails.name_fazenda });
            this.setState({ cpf_cnpj: this.props.userDetails.cpf_cnpj });
            this.setState({ hectares: this.props.userDetails.hectares });
            this.setState({ estado: this.props.userDetails.estado });
            this.setState({ area_agricultavel: this.props.userDetails.area_agricultavel });
            this.setState({ area_vegetacao: this.props.userDetails.area_vegetacao });
            this.setState({ plantacao: this.props.userDetails.plantacao });
            this.setState({ dadosApi: true });
            
        }
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    async updateUser() {
        this.setState({ erro: "" });
        this.setState({ success: "" });

        await this.receberDadosForm();

        if (!this.validade()) return;

        this.setState({ loading: true });

        const {id, name, name_fazenda, cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao } = this.state;
        alert(id)
        this.props.putUser(id,{  name, name_fazenda, cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao }, (err) => {
            if (err.erro.status === "error") {
                this.setState({ erro: { message: err.erro.message} });
                this.setState({ loading: false });
            } else {
                this.setState({ success: "atualizado com sucesso!"  });
                this.setState({ loading: false });
                this.setState({ formSuccess: true });
            }
        })

    }

    receberDadosForm() {
        this.setState({ id: document.querySelector("#id").value });
        this.setState({ name: document.querySelector("#name").value });
    }

    validade() {
        const { name, name_fazenda, cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao } = this.state;
        if (!name) return this.setState({ erro: { message: "Preencha o campo nome!" } });
        if (!name_fazenda) return this.setState({ erro: { message: "Preencha o campo nome fazenda" } });
        if (!cpf_cnpj) return this.setState({ erro: { message: "Preencha o campo cpf_cnpj" } });
        if (!estado) return this.setState({ erro: { message: "Preencha o campo nome estado" } });
        if (!hectares) return this.setState({ erro: { message: "Preencha o campo nome hectares" } });
        if (!area_agricultavel) return this.setState({ erro: { message: "Preencha o campo nome area_agricultavel" } });
        if (!area_vegetacao) return this.setState({ erro: { message: "Preencha o campo nome area vegetacao" } });
        if (!plantacao) return this.setState({ erro: { message: "Preencha o campo nome plantacao" } });
        return true;
    }

    apagarUser() {
        this.setState({ loading: true });
        const { id } = this.state;
        this.props.deleteUser(id, (err) => {
            if (err.erro.status === "error") {
                this.setState({ erro: { message: err.erro.message} });
                this.setState({ loading: false });
            } else {
                this.setState({ success: "apagado com sucesso!"  });
                this.setState({ loading: false });
                this.setState({ deleteSuccess: true });
                this.setState({ deleteSuccess: true });
            }
        })
    }

    openModal() {
        this.setState({ openModal: true });
    }

    closeModal() {
        this.setState({ openModal: false });
    }

    render() {
        const {id, name, name_fazenda, cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao, erro, success, loading ,dadosApi,openModal,formSuccess,deleteSuccess} = this.state;

        if (formSuccess) {
            return <Redirect to={{
                //pathname: '/user',
                pathname: '/view-user/' + id,
                state: { msg: 'Usuário editado com sucesso!' }
            }} />
        }
        if (deleteSuccess) {
            return <Redirect to={{
                pathname: '/user',
                state: { msg: 'Usuário apagado com sucesso!' }
            }} />
        }

        return (
            <>
                <Modal isOpen={openModal}>
                    <ModalHeader className="bg-danger text-white">Confirmar</ModalHeader>
                    <ModalBody>
                        Você realmente deseja apagar esse usuário?
                 </ModalBody>
                    <ModalFooter>
                        <Button outline color="primary" size="sm" onClick={() => this.closeModal()}>Cancelar</Button>
                        <span onClick={() => this.apagarUser()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </ModalFooter>
                </Modal>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Editar Usuário</h2>
                    </div>

                    <span className="d-none d-md-block">
                        <Link to={"/user"}>
                            <button className="btn btn-outline-info btn-sm">
                                Listar
                        </button>
                        </Link>

                        <Link to={"/view-user/" + this.props.match.params.id}>
                            <button className="ml-1 mr-1 btn btn-outline-primary btn-sm">
                                Visualisar
                        </button>
                        </Link>

                        <span onClick={() => this.openModal()}>
                            <SpinnerDeleteSimples loading={loading} />
                        </span>
                    </span>
                    <div className="dropdown d-block d-md-none">
                        <UncontrolledButtonDropdown>
                            <DropdownToggle outline color="primary" size="sm" caret>
                                Ações
                            </DropdownToggle>
                            <DropdownMenu right>
                                <Link className="dropdown-item" to={"/user"}>Listar</Link>
                                <Link className="dropdown-item" to={"/view-user/" + this.props.match.params.id}>Visualisar</Link>
                                <DropdownItem onClick={() => this.openModal()}>Apagar</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </div>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <Row form>
                        <Input type="hidden"
                            value={id}
                            name="id"
                            id="id"
                        />
                        <Col md={6}>
                            <Label for="name">Nome</Label>
                            <Input type="text"
                                value={name}
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder={dadosApi ? "Nome produtor" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="name"
                                onChange={(ev) => this.onChangeInput("name", ev)}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="name_fazenda">Nome fazenda</Label>
                            <Input type="text"
                                value={name_fazenda}
                                name="name_fazenda"
                                id="name_fazenda"
                                className="form-control"
                                placeholder={dadosApi ? "name fazenda" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="name_fazenda"
                                onChange={(ev) => this.onChangeInput("name_fazenda", ev)}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="cpf_cnpj">cpf/cnpj</Label>
                            <Input type="text"
                                value={cpf_cnpj}
                                name="cpf_cnpj"
                                id="cpf_cnpj"
                                className="form-control"
                                placeholder={dadosApi ? "cpf/cnpj" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="cpf_cnpj"
                                onChange={(ev) => this.onChangeInput("cpf_cnpj", ev)}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="estado">Estado</Label>
                            <Input type="text"
                                value={estado}
                                name="estado"
                                id="estado"
                                className="form-control"
                                placeholder={dadosApi ? "Estado" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="estado"
                                onChange={(ev) => this.onChangeInput("estado", ev)}
                            />
                        </Col>
                        <Col md={6}>
                                <Label for="hectares">Hectares</Label>
                                <Input type="number"
                                    value={hectares}
                                    name="hectares"
                                    id="hectares"
                                    className="form-control"
                                    placeholder={dadosApi ? "Hectares" : "Carregado..."}
                                    disabled={dadosApi ? false : true}
                                    autoComplete="hectares"
                                    onChange={(ev) => this.onChangeInput("hectares", ev)}
                                />
                        </Col>
                        <Col md={6}>
                            <Label for="area_agricultavel">Area agricultavel</Label>
                            <Input type="text"
                                value={area_agricultavel}
                                name="area_agricultavel"
                                id="area_agricultavel"
                                className="form-control"
                                placeholder={dadosApi ? "Area agricultavel" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="area_agricultavel"
                                onChange={(ev) => this.onChangeInput("area_agricultavel", ev)}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="area_vegetacao">area vegetacao</Label>
                            <Input type="text"
                                value={area_vegetacao}
                                name="area_vegetacao"
                                id="area_vegetacao"
                                className="form-control"
                                placeholder={dadosApi ? "area_vegetacao" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="area_vegetacao"
                                onChange={(ev) => this.onChangeInput("area_vegetacao", ev)}
                            />
                        </Col>
                        <Col md={6}>
                            <Label for="plantacao">Plantacao</Label>
                            <Input type="text"
                                value={plantacao}
                                name="plantacao"
                                id="plantacao"
                                className="form-control"
                                placeholder={dadosApi ? "Plantacao" : "Carregado..."}
                                disabled={dadosApi ? false : true}
                                autoComplete="plantacao"
                                onChange={(ev) => this.onChangeInput("plantacao", ev)}
                            />
                        </Col>
                        <Col md={12} className="mt-4">
                            <Link onClick={() => this.updateUser()} to="#">
                                <SpinnerUp loading={loading} />
                            </Link>
                        </Col>
                    </Row>        

                    

                </Form>
            </>
        )
    }
}

const mapStateToProps = state => ({
    userDetails: state.user.userDetails,
})

export default connect(mapStateToProps, actions)(UpdateUser);