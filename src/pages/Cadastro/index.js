import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/users';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AlertDanger from "../../components/AlertDanger";
import AlertSuccess from "../../components/AlertSuccess";
import validator from 'validator';
import MaskedInput from 'react-text-mask';

class CadUser extends Component {

    state = {
        name: "",
        email: "",
        telefone:"",
        senha: "",
        erro: "",
        success: "",
        formSuccess:false
    }

    onChangeInput = (field, ev) => {
        this.setState({ [field]: ev.target.value });
    }

    cadUser() {
        const { name, email,telefone, senha } = this.state;
        if(!this.validate()) return;
        this.props.postUser({name, email,telefone, senha}, (err) =>{
            if(err.erro.status === "error"){
                this.setState({erro: {message: err.erro.message}});
                this.setState({success: ""});
                console.log(err.erro.status);
            }else{
                this.setState({success: "Cadastrado com sucesso"});
                this.setState({erro: ""});
                this.setState({ formSuccess: true });
            }
        })
    }

    validate(){
        const { name, email, senha } = this.state;
        if(!name) return this.setState({erro:{message: "Preencha o campo nome"}});
        if(!email) return this.setState({erro:{message: "Preencha o campo email"}});
        if(!validator.isEmail(email)) return this.setState({erro:{message: "Preencha com email valido"}});
        if(!senha) return this.setState({erro:{message: "Preencha o campo senha"}});
        if(senha.length < 6 ) return this.setState({erro:{message: "A senha precisa ter no minimo 6 caracteres"}});
        return true;
    }

    render() {
        const { name, email, telefone, senha, erro, success,formSuccess} = this.state;

        if (formSuccess) {
            return <Redirect to={{
                pathname: '/',
                state: { msg: 'Usuário cadastrado com sucesso!' }
            }} />
        }

        return (
            <>

                <div className="container-form">
                    <div className="login card shadow">
                        <Form className="form-signin text-center">
                            <h1 className="h3 mb-3 font-weight-normal">Cadastrar</h1>
                            <AlertDanger erros={erro} />
                            <AlertSuccess erros={success} />
                            <FormGroup>
                                <Label for="name">Nome</Label>
                                <Input
                                    type="text"
                                    value={name}
                                    name="name"
                                    id="name"
                                    placeholder="Nome"
                                    onChange={(ev) => this.onChangeInput("name", ev)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="telefone">Telefone</Label>
                                    <MaskedInput
                                    type="text"
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    className="form-control"
                                    placeholder="Telefone"
                                    guide={false}
                                    value={telefone}
                                    name="telefone"
                                    id="telefone"
                                    onChange={(ev) => this.onChangeInput("telefone", ev)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">E-mail</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    name="email"
                                    id="email"
                                    placeholder="E-mail do usuário"
                                    onChange={(ev) => this.onChangeInput("email", ev)} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="senha">Senha</Label>
                                <Input
                                    type="password"
                                    value={senha}
                                    name="senha"
                                    id="senha"
                                    placeholder="Senha deve ter no minimo 6 caracteres"
                                    onChange={(ev) => this.onChangeInput("senha", ev)} />
                            </FormGroup>

                            <Button
                                color="primary btn-block"
                                size="lg"
                                onClick={() => this.cadUser()}>Cadastrar
                            </Button>
                            <Link to="/">
                                <Button
                                    color="btn btn-outline-info  btn-block mt-2"
                                    size="lg"
                                   >Voltar
                                </Button>
                            </Link>
                        </Form>
                    </div>
                </div>
            </>
        )
    }
}

export default connect(null, actions)(CadUser);