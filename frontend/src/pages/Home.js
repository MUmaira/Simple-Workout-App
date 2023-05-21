import { useEffect } from "react"
import { useWorkoutContext } from "../Hooks/useWorkoutsContext"

//components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

const Home = () =>{
   const {workouts, dispatch} = useWorkoutContext()
     useEffect(() => {
           const fetchWorkouts = async () => {
                const response = await fetch("/api/workouts")
                //after saving restart the server
                const json = await response.json()

                if(response.ok){
                   dispatch({type: 'SET_WORKOUT', payload: json})
                }
           } 

           fetchWorkouts()
     },[dispatch]) //empty - dependancy array so  that the component will render only once

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                    
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export  default Home