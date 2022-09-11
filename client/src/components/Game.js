import React, { useState } from "react"

function Game() {
    const placeholderTeams = `<Team A name> <Team A registration date in DD/MM> <Team A group number>\n<Team B name> <Team B registration date in DD/MM> <Team B group number>\n<Team C name> <Team C registration date in DD/MM> <Team C group number>`
    const placeholderMatches = `<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>\n<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>\n<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>`
    // const [Teamstext, setTeamstext]  = useState("")
    // const [Matchestext, setMatchestext] = useState("")
    const [Data, setData] = useState([])

    const responseBody = {}

    const inputChangeHandler = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, property) => responseBody[property] = value);
        const teammatch = JSON.stringify(responseBody)
        const data = await fetch("/ranked",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: teammatch
        }).then(response => response.json())
        .then(data =>data)
        setData(data)
    }

    console.log(Data)

    return (
        <div>
            <form onSubmit={inputChangeHandler}>
                <label htmlFor="Teams" className="sr-only" style={{"marginTop":"10px"}}>Enter Team information</label>
                <textarea type="text" name="Teams" id="Teams" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderTeams} required></textarea>
                <label htmlFor="Matches" className="sr-only" style={{"marginTop":"10px"}}>Enter Matches information</label>
                <textarea type="text" name="Matches" id="Matches" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderMatches} required></textarea>
                <button type="submit" style={{'marginTop':'10px'}} className="btn btn-info">Load data</button>
                <button type="reset" style={{'marginTop':'10px', "marginLeft":"10px"}} className="btn btn-danger">reset data</button>
            </form>
        </div>
    )
}

export default Game