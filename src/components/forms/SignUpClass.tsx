import React from 'react';
import { Form, Input, Button, Checkbox, InputNumber } from 'antd';
import * as Validators from '../../helpers/validators';
import { Rule } from 'antd/lib/form';

type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

class SignUpClass extends React.Component {
    public state: any;


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

    private readonly productRules = [{ required: true, message: 'Product is required' }];

    constructor(props: any) {
        super(props)
        this.state = {
            // quantityValidationStatus: { validateStatus: '' }
            quantityValidationStatus: {}
        }
    }

    render() {
        return <>
            <Form
                {... this.formItemLayout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Product"
                    name="product"
                    rules={this.productRules}
                >
                    <Input placeholder="Custom Validator" />
                    
                </Form.Item>


                <Form.Item
                    {...this.state.quantityValidationStatus}
                    label="Quantity"
                    name="quantity"
                    hasFeedback
                >
                    <InputNumber id="quantity" placeholder="Async Validator 2" onChange={this.tipQuantity.bind(this)} />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>;
    }

    // tip key on email
    toTip: any;
    tipQuantity(event: any) {
        this.setState({ quantityValidationStatus: { validateStatus: '' } });
        clearTimeout(this.toTip)

        this.toTip = setTimeout(() => {
            this.isQuantityAvailable(event)
        }, 350)
    };


    // simulate request
    toRequestSimulator: any;
    isQuantityAvailable(quantity: string) {
        clearTimeout(this.toRequestSimulator)
        this.setState({ quantityValidationStatus: { validateStatus: 'validating' } });

        this.toRequestSimulator = setTimeout(() => {

            // random result
            if (Math.random() < 0.5) {
                this.setState({ quantityValidationStatus: { validateStatus: 'error' } });
            } else {
                this.setState({ quantityValidationStatus: { validateStatus: 'success' } });
            }
        }, 1000)
    };

    onFinish(values: any) {
        console.log('Success:', values);
    };

    onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };

}

export default SignUpClass

