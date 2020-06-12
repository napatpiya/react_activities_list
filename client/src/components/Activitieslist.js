import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { navigate } from '@reach/router';
import axios from 'axios';

const Activitieslist = props => {

    const [activities, setActivities] = useState([]);

    function isPast(date) {
        return new Date(date) < new Date(new Date().toDateString());
    }

    const deleteActivity = (activityId) => {
        axios.delete('http://localhost:8000/api/activities/' + activityId)
            .then(res => {
                fetchActivities();
            });
    }

    const fetchActivities = () => {
        axios.get('http://localhost:8000/api/activities')
            .then( res => setActivities(res.data) )
            .catch( err => console.log(err) );
    }

    useEffect(() => {
        fetchActivities();
    }, [])

    return (
        <div className="columns">
            <div className="column">
                <h2><strong>Past Activities</strong></h2>
                { activities.filter( a => isPast(a.date)).map( (activity, i) => {
                    return (
                        <article className="message is-small is-warning" key={i}>
                            <div className="message-header">
                                <p>{activity.type}</p>
                                <span>
                                    <button className="button is-small is-warning is-inverted is-rounded" aria-label="edit" onClick={() => navigate(`/update/${activity._id}`)} >Edit</button>
                                    {" "}
                                    <button className="button is-small is-warning is-inverted is-rounded" aria-label="delete" onClick={(e) => {deleteActivity(activity._id)}} >Delete</button>
                                    {/* <button className="delete" aria-label="delete" onClick={(e) => {deleteActivity(activity._id)}}></button> */}
                                </span>
                            </div>
                            <div className="message-body">
                                <p>{moment(activity.date).format("MM/DD/YYY")}</p>
                                <p>{activity.amount} {activity.units}</p>
                            </div>
                        </article>
                    )
                })}
            </div>
            <div className="column">
                <h2><strong>Today's Activities</strong></h2>
                { activities.filter( a => !isPast(a.date)).map( (activity, i) => {
                    return (
                        <article className="message is-small is-danger" key={i}>
                            <div className="message-header">
                                <p>{activity.type}</p>
                                <span>
                                    <button className="button is-small is-danger is-inverted is-rounded" aria-label="edit" onClick={() => navigate(`/update/${activity._id}`)} >Edit</button>
                                    {" "}
                                    <button className="button is-small is-danger is-inverted is-rounded" aria-label="delete" onClick={(e) => {deleteActivity(activity._id)}} >Delete</button>
                                    {/* <button className="delete" aria-label="delete" onClick={(e) => {deleteActivity(activity._id)}}></button> */}
                                </span>
                            </div>
                            <div className="message-body">
                                <p>{moment(activity.date).format("MM/DD/YYY")}</p>
                                <p>{activity.amount} {activity.units}</p>
                            </div>
                        </article>
                    )
                })}
            </div>
        </div>
    );
}

export default Activitieslist;