import React, { useRef } from "react"

function Game(props) {
    const placeholderTeams = `<Team A name> <Team A registration date in DD/MM> <Team A group number>\n<Team B name> <Team B registration date in DD/MM> <Team B group number>\n<Team C name> <Team C registration date in DD/MM> <Team C group number>`
    const placeholderMatches = `<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>\n<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>\n<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>`
    const text1 = useRef()
    const text2 = useRef()

    const responseBody = {}

    const inputChangeHandler = async (event) => {
        event.preventDefault()
        props.buttonpressed(true)
        props.rankresults([])
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, property) => responseBody[property] = value);
        const teammatch = JSON.stringify(responseBody)
        const data = await fetch("https://govtacefootball.herokuapp.com/ranked",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: teammatch
        }).then(response => response.json())
        .then(data =>data)
        props.rankresults(data)
    }

    function updatearea(){
        text1.current.value = `teamA 01/04 1\nteamB 02/05 1\nteamC 03/06 1\nteamD 04/06 1\nteamE 05/06 1\nteamF 15/06 1\nteamG 14/06 2\nteamH 13/06 2\nteamI 12/06 2\nteamJ 11/06 2\nteamK 10/06 2\nteamL 27/06 2`
        text2.current.value = `teamA teamB 0 1\nteamA teamC 1 3\nteamA teamD 2 2\nteamA teamE 2 4\nteamA teamF 3 3\nteamB teamC 0 1\nteamB teamD 2 2\nteamB teamE 4 0\nteamB teamF 0 0\nteamC teamD 2 0\nteamC teamE 0 0\nteamC teamF 1 0\nteamD teamE 0 3\nteamD teamF 2 1\nteamE teamF 3 4\nteamG teamH 3 2\nteamG teamI 0 4\nteamG teamJ 1 0\nteamG teamK 1 4\nteamG teamL 1 4\nteamH teamI 2 0\nteamH teamJ 3 0\nteamH teamK 3 4\nteamH teamL 0 1\nteamI teamJ 2 1\nteamI teamK 3 0\nteamI teamL 1 3\nteamJ teamK 1 4\nteamJ teamL 0 3\nteamK teamL 0 0`
    }

    return (
        <div>
            <form onSubmit={inputChangeHandler}>
                <label htmlFor="Teams" className="sr-only" style={{"marginTop":"10px"}}>Enter Team information</label>
                <textarea type="text" ref={text1} name="Teams" id="Teams" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderTeams} required></textarea>
                <label htmlFor="Matches" className="sr-only" style={{"marginTop":"10px"}}>Enter Matches information</label>
                <textarea type="text" ref={text2} name="Matches" id="Matches" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderMatches} required></textarea>
                <button type="submit" style={{'marginTop':'10px'}} className="btn btn-info">Load data</button>
                <button type="reset" style={{'marginTop':'10px', "marginLeft":"10px"}} className="btn btn-danger">reset data</button>
            </form>
            <button className="btn btn-xs btn-outline-secondary " style={{'marginTop':'10px'}} onClick={()=>updatearea()} >test1</button>
        </div>
    )
}

export default Game