import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import * as Validators from '../../helpers/validators';
import { Rule } from 'antd/lib/form';


const SignUpFunction = () => {
    const [form] = Form.useForm(); // TODO
    form.setFieldsValue({ email: 'ricardo@g.com' }); // TODO

    const [useCellPhone, setUseCellPhone] = useState(false)

    let too: any
    let checkCellPhone = false

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
        },
    };

    const emailRule: Rule[] = [{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please input a valid email!' }];
    const passwordRules: Rule[] = [
        { required: true, message: 'Please input your password!' },
        { pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/), message: 'try: Testing193!' }
    ]


    const checkEmail = (_: any, value: string) => {
        return new Promise(function (resolve, reject) {
            clearTimeout(too)

            // simulate request
            too = setTimeout(() => {
                var isBusy = Math.random() < 0.5;
                if (isBusy) {
                    reject(new Error('Email busy!'));
                } else {
                    resolve("Stuff worked!");
                }
            }, 1000)

        })
    };

    const onCheckboxChange = (e: { target: { checked: boolean } }) => {
        setUseCellPhone(e.target.checked);
      };



    const onFinish = (values: any) => {
        debugger
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        debugger
        /*
            !this.form.isFieldsTouched(true) ||
            !!this.form.getFieldsError().filter(({ errors }) => errors.length).length
        */
        console.log('Failed:', errorInfo);
    };

    const onFieldsChange = (changedFields: any, allFields: any) => {
        console.log(changedFields, allFields)
    }

    const onValuesChange = (values: any) => {
        console.log(values)
    }

    return <>
        <Form
            {...formItemLayout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onFieldsChange={onFieldsChange}
            onValuesChange={onValuesChange}
            form={form}
            autoComplete="off"
        >

            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: '' },
                    { validator: Validators.validUsername }
                ]}
            >
                <Input placeholder="Custom Validator" />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email2"
                hasFeedback
                rules={[
                    ...emailRule,
                    { validator: checkEmail }
                ]}
            >
                <Input id="validating2" placeholder="Async Validator" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={passwordRules}
            >
                <Input.Password placeholder="RegExp: Testing193!" />
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
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    })
                ]}
            >
                <Input.Password placeholder="Dependencies" />
            </Form.Item>

            <Form.Item
                label="Cell phone"
                name="cellPhone"
                rules={[
                    {
                        required: useCellPhone,
                        message: 'Please input your cell phone',
                    }]}>
                <Input placeholder="Dynamic" />
            </Form.Item>


            <Form.Item name="cellPhoneCheck" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox  checked={useCellPhone} onChange={onCheckboxChange} >can login with Cell Phone</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" disabled={false} >
                    Submit
                </Button>
            </Form.Item>


        </Form>
    </>;

}

export default SignUpFunction

