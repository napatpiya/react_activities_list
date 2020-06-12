import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Create = props => {

    const [type, setType] = useState("Running");
    const [date, setDate] = useState();
    const [amount, setAmount] = useState(0);
    const [units, setUnits] = useState("");
    const [errors, setErrors] = useState({});

    function refreshPage() {
        window.location.reload(false);
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/activities', {
            type,
            date,
            amount,
            units
        })
            .then(res => {
                if (res.data.errors) {
                    setErrors({});
                    setErrors(res.data.errors);
                } else {
                    setErrors({});
                    navigate("/");
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-half is-3">
                    <article className="message is-warning">
                        <div className="message-header">
                            <p>Create new activity</p>
                        </div>
                        <div className="message-body">
                            <form onSubmit={onSubmitHandler}>
                                <div className="field">
                                    <label className="label">Type</label>
                                    <div className="control">
                                        <div className="select" onChange={ e => setType(e.target.value)}>
                                            <select>
                                                <option>Running</option>
                                                <option>Hiking</option>
                                                <option>Aerobics</option>
                                                <option>Stair Climbing</option>
                                                <option>Jumping Rope</option>
                                                <option>Swimming</option>
                                            </select>
                                            {
                                                errors.type ? 
                                                <p className="help is-danger">{errors.type.message}</p> :
                                                ""
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Date</label>
                                    <div className="control">
                                        <input className="input" type="date" placeholder="Text input" onChange={ e => setDate(e.target.value)} />
                                    </div>
                                    {
                                        errors.date ? 
                                        <p className="help is-danger">{errors.date.message}</p> :
                                        ""
                                    }
                                </div>
                                <div className="field">
                                    <label className="label">Amount</label>
                                    <div className="control">
                                        <input className="input" type="number" step="0.1" placeholder="Amount" onChange={ e => setAmount(e.target.value)} />
                                    </div>
                                    {
                                        errors.amount ? 
                                        <p className="help is-danger">{errors.amount.message}</p> :
                                        ""
                                    }
                                </div>

                                <div className="field">
                                    <label className="label">Units</label>
                                    <div className="control">
                                        <input className="input" type="text" placeholder="Units" onChange={ e => setUnits(e.target.value)} />
                                    </div>
                                    {
                                        errors.units ? 
                                        <p className="help is-danger">{errors.units.message}</p> :
                                        ""
                                    }
                                </div>
                                <br />
                                <div className="columns is-centered">
                                    <div className="field is-grouped">
                                        <div className="control">
                                            <button className="button is-warning is-rounded">Submit</button>
                                        </div>
                                        <div className="control">
                                            <button className="button is-danger is-rounded" onClick={ () => navigate("/")}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
}

export default Create;