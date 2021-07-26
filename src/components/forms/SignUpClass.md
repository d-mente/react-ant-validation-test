import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import * as Validators from '../../helpers/validators';
import { Rule } from 'antd/lib/form';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

class SignUpClass extends React.Component {
    public state: any;

    form: any;

    private readonly formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
    };

    private readonly passwordRules = [{ required: true, message: 'Please input your password!' }];

    constructor(props: any) {
        super(props)
        this.state = {
            // emailValidationStatus: { validateStatus: '' }
            emailValidationStatus: {}
        }
    }

    render() {
        return <>
            <Form
                {... this.formItemLayout}
                form={this.form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}

            >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        { required: true, message: '' },
                        { validator: Validators.validUsername }
                    ]}
                >
                    <Input autoComplete="off" />
                </Form.Item>


                <Form.Item
                    {...this.state.emailValidationStatus}
                    label="Email"
                    name="email"
                    hasFeedback
                >
                    <Input id="validating" autoComplete="off" onChange={this.tipEmail.bind(this)} />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email2"
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { validator: this.checkEmail.bind(this) }
                    ]}
                >
                    <Input id="validating2" autoComplete="off"  />
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    rules={this.passwordRules}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>;
    }

    too: any
    checkEmail(_: any, value: string) {
        let _self = this
        return new Promise(function (resolve, reject) {
            clearTimeout(_self.too)


            // request simulation
            _self.too = setTimeout(() => {
                ///isEmailBusy2()

        var isBusy = Math.random() < 0.5;

                if (!isBusy) {
                    resolve("Stuff worked!");
                } else {
                    reject(new Error('Email no!'));
                }
            }, 1000)

        })
    };



    // simulate request
    toRequestSimulator2: any;
    isEmailBusy2(email: string) {
        let _self = this
        return new Promise(function (resolve, reject) {
            clearTimeout(_self.too)

            _self.too = setTimeout(() => {
                
                if (email.length > 0) {
                    console.log('ok')
                    //resolve("Stuff worked!");
                } else {
                    console.log('xx')
                    reject(new Error('Price must be greater than zero!'));
                }
            }, 1000)

        })


        clearTimeout(this.toRequestSimulator)
        this.setState({ emailValidationStatus: { validateStatus: 'validating' } });




        var isBusy = Math.random() < 0.5;
        this.toRequestSimulator2 = setTimeout(() => {

            // is validEmail
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                this.setState({ emailValidationStatus: { validateStatus: 'error' } });
                return
            }

            // random result
            if (isBusy) {
                this.setState({ emailValidationStatus: { validateStatus: 'error' } });
            } else {
                this.setState({ emailValidationStatus: { validateStatus: 'success' } });
            }
        }, 1000)
    };


    // tip key on email
    toEmail: any;
    tipEmail(event: any) {
        this.setState({ emailValidationStatus: { validateStatus: '' } });
        clearTimeout(this.toEmail)

        this.toEmail = setTimeout(() => {
            this.isEmailBusy(event.target.value)
        }, 350)
    };


    // simulate request
    toRequestSimulator: any;
    isEmailBusy(email: string) {
        clearTimeout(this.toRequestSimulator2)
        this.setState({ emailValidationStatus: { validateStatus: 'validating' } });




        var isBusy = Math.random() < 0.5;
        this.toRequestSimulator = setTimeout(() => {

            // is validEmail
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(email).toLowerCase())) {
                this.setState({ emailValidationStatus: { validateStatus: 'error' } });
                return
            }

            // random result
            if (isBusy) {
                this.setState({ emailValidationStatus: { validateStatus: 'error' } });
            } else {
                this.setState({ emailValidationStatus: { validateStatus: 'success' } });
            }
        }, 1000)
    };

    onFinish(values: any) {
        console.log('Success:', values);
    };

    private onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };

}

export default SignUpClass

