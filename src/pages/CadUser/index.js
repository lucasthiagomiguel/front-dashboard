import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { Form, FormGroup, Label, Input,Row, Col } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import SpinnerCad from "../../components/SpinnerCad";

class CadUser extends Component {

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
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadUser() {
        const { name, name_fazenda, cpf_cnpj,estado ,plantacao } = this.state;
        if (!this.validate()) return;
       const hectares = parseInt(this.state.hectares);
       const area_vegetacao = parseInt(this.state.area_vegetacao);
       const area_agricultavel = parseInt(this.state.area_agricultavel);

        this.setState({ loading: true });
        

        this.props.postUser({ name,name_fazenda,cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao },(err) =>{
            if (err.erro.status === "error") {
                this.setState({ erro: { message: err.erro.message } });
                this.setState({ success: "" });
                this.setState({ loading: false });
            } else {
                this.setState({ success: "cadastrado com sucesso!"  });
                this.setState({ erro: "" });
                this.setState({ formSuccess: true });
                this.setState({ loading: false });
            }
            console.log(err)
        })
    }

    validate() {
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

    render() {
        const { name, name_fazenda, cpf_cnpj,estado,hectares,area_agricultavel,area_vegetacao,plantacao, erro, success, loading } = this.state;

        return (
            <>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h2 className="display-4 titulo">Cadastrar Usuário</h2>
                    </div>
                    <Link to={"user"}>
                        <button className="btn btn-outline-info btn-sm">
                            Listar
                        </button>
                    </Link>
                </div><hr />
                <AlertDanger erros={erro} />
                <AlertSuccess erros={success} />
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    name="name"
                                    id="name"
                                    placeholder="Nome completo do usuário"
                                    autoComplete="name"
                                    onChange={(ev) => this.onChangeInput("name", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                            <Label for="name_fazenda">Nome fazenda</Label>
                            <Input
                                type="text"
                                value={name_fazenda}
                                name="name_fazenda"
                                id="name_fazenda"
                                placeholder="Melhor e-mail do usuário"
                                autoComplete="name_fazenda"
                                onChange={(ev) => this.onChangeInput("name_fazenda", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                            <Label for="cpf_cnpj">cpf/cnpj</Label>
                            <Input
                                type="text"
                                value={cpf_cnpj}
                                name="cpf_cnpj"
                                id="cpf_cnpj"
                                placeholder="Melhor e-mail do usuário"
                                autoComplete="cpf_cnpj"
                                onChange={(ev) => this.onChangeInput("cpf_cnpj", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="estado">estado</Label>
                                <Input
                                    type="text"
                                    value={estado}
                                    name="estado"
                                    id="estado"
                                    autoComplete="estado"
                                    onChange={(ev) => this.onChangeInput("estado", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="hectares">hectares</Label>
                                <Input
                                    type="number"
                                    value={hectares}
                                    name="hectares"
                                    id="hectares"
                                    autoComplete="hectares"
                                    onChange={(ev) => this.onChangeInput("hectares", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="area_agricultavel">area_agricultavel</Label>
                                <Input
                                    type="number"
                                    value={area_agricultavel}
                                    name="area_agricultavel"
                                    id="area_agricultavel"
                                    autoComplete="area_agricultavel"
                                    onChange={(ev) => this.onChangeInput("area_agricultavel", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="plantacao">area_vegetacao</Label>
                                <Input
                                    type="number"
                                    value={area_vegetacao}
                                    name="area_vegetacao"
                                    id="area_vegetacao"
                                    autoComplete="area_vegetacao"
                                    onChange={(ev) => this.onChangeInput("area_vegetacao", ev)} />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="plantacao">plantacao</Label>
                                <Input
                                    type="text"
                                    value={plantacao}
                                    name="plantacao"
                                    id="plantacao"
                                    autoComplete="plantacao"
                                    onChange={(ev) => this.onChangeInput("plantacao", ev)} />
                            </FormGroup>
                        </Col>
                    </Row>
                    

                    <Link onClick={() => this.cadUser()} to="#">
                        <SpinnerCad loading={loading} />
                    </Link>
                </Form>
            </>
        )
    }
}

export default connect(null, actions)(CadUser);