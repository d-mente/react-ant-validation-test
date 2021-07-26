import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker, Alert } from 'antd';
import * as Validators from '../../helpers/validators';
import { Rule } from 'antd/lib/form';
import moment from 'moment';
import ReactDOM from 'react-dom';


type ValidateStatus = Parameters<typeof Form.Item>[0]['validateStatus'];

class SignUpClass extends React.Component {

    public state: any;

    //const[dateStart, setDateStart] = this.useState(now.toDate());
    //const [dateEnd, setDate] = this.useState(nowPlus1.toDate()); 

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
            formMessages: [],
            formValues: {
                title: 'qwe',
                notes: 'asdfgnm,',
                start: moment(),
                end: moment().add(1, 'day')
            }
        }
    }

    render() {
        return <>
            <Form
                {... this.formItemLayout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish.bind(this)}
                onFinishFailed={this.onFinishFailed.bind(this)}
                autoComplete="off"
            >

                <Form.Item
                    label="Fecha y hora de inicio"
                    name="startDateTime"
                >
                    <DatePicker defaultValue={this.state.formValues.start} onChange={this.handleStartDateChange.bind(this)} />
                </Form.Item>

                <Form.Item
                    label="Fecha y hora de fin"
                    name="endDateTime"
                >
                    <DatePicker defaultValue={this.state.formValues.end} onChange={this.handleEndDateChange.bind(this)} />
                </Form.Item>


                <Form.Item
                    label="Titulo"
                    name="title"
                >
                    <Input id="title" defaultValue={this.state.formValues.title} onChange={this.handleTitleChange.bind(this)} />
                </Form.Item>


                <Form.Item
                    label="Notas"
                    name="notes"
                >
                    <Input.TextArea defaultValue={this.state.formValues.notes} onChange={this.handleNotesChange.bind(this)} />
                </Form.Item>


                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Guardar
                    </Button>
                </Form.Item>
            </Form>

            {
                this.state.formMessages.map((object: any, i: any) =>
                    <Alert
                        key={i}
                        message={object.message}
                        description={object.description}
                        type={object.type}
                        showIcon
                    />
                )
            }



        </>;
    }





    handleInputChange({ target }: any) {
        this.setState({ emailValidationStatus: { validateStatus: 'validating' } });
    }


    handleStartDateChange(e: any) {
        this.setState({
            formValues: {
                ...this.state.formValues,
                start: e
            }
        })
    }

    handleEndDateChange(e: any) {
        this.setState({
            formValues: {
                ...this.state.formValues,
                end: e
            }
        })
    }

    handleTitleChange(e: any) {
        this.setState({
            formValues: {
                ...this.state.formValues,
                title: e.target.value
            }
        })
    }

    handleNotesChange(e: any) {
        this.setState({
            formValues: {
                ...this.state.formValues,
                notes: e.target.value
            }
        })
    }

    onFinish(values: any) {
        let hasErrors = false;
        let messages = [];
        const momentStart = moment(this.state.formValues.start)
        const momentEnd = moment(this.state.formValues.end)

        if (momentEnd.diff(momentStart) < 0) {
            hasErrors = true;
            messages.push({
                message: "Error",
                description: "The end date must be after the start date.",
                type: "error"
            })
        }
        if (this.state.formValues.title == "") {
            messages.push({
                message: "Warning",
                description: "Title optional.",
                type: "warning"
            })
        }
        if (this.state.formValues.notes == "") {
            messages.push({
                message: "Warning",
                description: "Notes optional.",
                type: "warning"
            })
        }

        if (!hasErrors) {
            messages.push({
                message: "Success",
                description: "OK!!!!!.",
                type: "success"
            })
        }

        this.setState({
            formMessages: [
                ...messages
            ]
        })
    };

    private onFinishFailed(errorInfo: any) {
        console.log('Failed:', errorInfo);
    };

}

export default SignUpClass

