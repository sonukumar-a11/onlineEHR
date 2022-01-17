import React, { Component } from 'react'

export default class Medication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValues: [{
                medic_name: "",
                dose_unit: "",
                dose_amount: "",
                dose_frequency: "",
                manufacturer: ""
            }]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
     
    handleChange(i, e) {
        let formValues = this.state.formValues;
        formValues[i][e.target.name] = e.target.value;
        this.setState({ formValues });
    }

    addFormFields() {
        this.setState(({
            formValues: [...this.state.formValues, { medic_name: "", dose_unit: "", dose_amount: "", dose_frequency: "", manufacturer: "" }]
        }))
    }

    removeFormFields(i) {
        let formValues = this.state.formValues;
        formValues.splice(i, 1);
        this.setState({ formValues });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state.formValues));
    }
    render() {
        return (
            // <div className="mx-3 grid" style={{ backgroundColor: '#ddab7d' }}>
                <form className="row g-3 needs-validation mx-4 my-4" >
                    <h1 className="text-center my-5">Medication Details</h1>
                    {this.state.formValues.map((element, index) => (
                        <div key={index}>
                            <div className="row g-3">
                                <div className="col-md-2">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Medication Name
                                    </label>
                                    <input
                                        type="text"
                                        name='medic_name'
                                        value={element.medic_name || ""} onChange={e => this.handleChange(index, e)}
                                        className="form-control"
                                        id="validationCustom01"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Manufacturer
                                    </label>
                                    <input
                                        type="text"
                                        name='manufacturer'
                                        value={element.manufacturer || ""} onChange={e => this.handleChange(index, e)}
                                        className="form-control"
                                        id="validationCustom01"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Dose Unit
                                    </label>
                                    <input
                                        type="text"
                                        name='dose_unit'
                                        value={element.dose_unit || ""} onChange={e => this.handleChange(index, e)}
                                        className="form-control"
                                        id="validationCustom01"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="validationCustom01" className="form-label">
                                        Dose Amount
                                    </label>
                                    <input
                                        type="number"
                                        name='dose_amount'
                                        value={element.dose_amount || ""} onChange={e => this.handleChange(index, e)}
                                        className="form-control"
                                        id="validationCustom01"
                                        required
                                    />
                                    <div className="valid-feedback">Looks good!</div>
                                </div>
                                <div className="col-md-2">
                                    <label htmlFor="validationCustom04" className="form-label">
                                        Frequency
                                    </label>
                                    <select className="form-select" id="validationCustom04"
                                        name='dose_frequency'
                                        value={element.dose_frequency || ""} onChange={e => this.handleChange(index, e)}
                                        required>
                                        <option selected disabled value="">
                                            Select
                                        </option>
                                        <option value="Per Day">Per Day</option>

                                        <option value="Per Half Day">Per Half Day</option>
                                        <option value="Per Quarter Day">Per Quarter Day</option>
                                    </select>
                                    <div className="invalid-feedback">Please select a valid Frequency.</div>
                                </div>
                                
                                    {index ?
                                            <div className="col-md-1">
                                            <button type="button" className="btn btn-primary " onClick={() => this.removeFormFields(index)}>Remove</button>
                                            </div>
                                            : null
                                    }
                                
                            </div>
                        </div>
                    ))}

                    <div className="col-md-2 my-4">
                        <button className="btn btn-primary" onClick={() => this.addFormFields()}>
                            Add Section
                        </button>
                    </div>
                    <div className="col-12 my-4">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>
                            Submit
                        </button>
                    </div>

                </form >
            // </div >
        )
    }
}

