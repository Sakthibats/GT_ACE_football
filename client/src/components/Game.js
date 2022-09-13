import React, { useRef } from "react"

function Game(props) {
    // Input variables for placeholder
    const placeholderTeams = `<Team A name> <Team A registration date in DD/MM> <Team A group number>\n<Team B name> <Team B registration date in DD/MM> <Team B group number>\n<Team C name> <Team C registration date in DD/MM> <Team C group number>`
    const placeholderMatches = `<Team A name> <Team B name> <Team A goals scored> <Team B goals scored>\n<Team B name> <Team C name> <Team B goals scored> <Team C goals scored>\n<Team C name> <Team D name> <Team C goals scored> <Team D goals scored>`
    // Input texts for test cases
    const text1options = [`teamA 01/04 1\nteamB 02/05 1\nteamC 03/06 1\nteamD 04/06 1\nteamE 05/06 1\nteamF 15/06 1\nteamG 14/06 2\nteamH 13/06 2\nteamI 12/06 2\nteamJ 11/06 2\nteamK 10/06 2\nteamL 27/06 2`
                        , `teamA 01/04 1\nteamB 02/05 2\nteamC 03/06 1\nteamD 04/06 2\nteamE 05/06 2\nteamF 15/06 1\nteamG 14/06 2\nteamH 13/06 1\nteamI 12/06 1\nteamJ 11/06 2\nteamK 10/06 1\nteamL 27/06 2`
                        , `teamA 01/04 1\nteamB 02/05 2\nteamC 03/06 1\nteamD 04/06 2\nteamE 05/06 2\nteamF 15/06 1\nteamG 14/06 2\nteamH 13/06 1\nteamI 12/06 1\nteamJ 11/06 2\nteamK 10/06 1\nteamL 27/06 2`]
    const text2options = [`teamA teamB 0 1\nteamA teamC 1 3\nteamA teamD 2 2\nteamA teamE 2 4\nteamA teamF 3 3\nteamB teamC 0 1\nteamB teamD 2 2\nteamB teamE 4 0\nteamB teamF 0 0\nteamC teamD 2 0\nteamC teamE 0 0\nteamC teamF 1 0\nteamD teamE 0 3\nteamD teamF 2 1\nteamE teamF 3 4\nteamG teamH 3 2\nteamG teamI 0 4\nteamG teamJ 1 0\nteamG teamK 1 4\nteamG teamL 1 4\nteamH teamI 2 0\nteamH teamJ 3 0\nteamH teamK 3 4\nteamH teamL 0 1\nteamI teamJ 2 1\nteamI teamK 3 0\nteamI teamL 1 3\nteamJ teamK 1 4\nteamJ teamL 0 3\nteamK teamL 0 0`
                        , `teamA teamC 3 4\nteamA teamF 1 1\nteamA teamH 2 1\nteamA teamI 0 2\nteamA teamK 1 0\nteamB teamD 2 2\nteamB teamE 2 1\nteamB teamG 1 2\nteamB teamJ 1 4\nteamB teamL 1 1\nteamC teamF 1 3\nteamC teamH 2 2\nteamC teamI 4 1\nteamC teamK 0 2\nteamD teamE 3 0\nteamD teamG 4 1\nteamD teamJ 4 4\nteamD teamL 4 1\nteamE teamG 3 4\nteamE teamJ 0 1\nteamE teamL 1 0\nteamF teamH 2 4\nteamF teamI 2 1\nteamF teamK 3 3\nteamG teamJ 3 1\nteamG teamL 2 1\nteamH teamI 1 1\nteamH teamK 0 1\nteamI teamK 4 1\nteamJ teamL 2 1`
                        , `teamA teamC 3 3\nteamA teamF 4 4\nteamA teamH 1 1\nteamA teamI 3 3\nteamA teamK 0 0\nteamB teamD 2 1\nteamB teamE 3 2\nteamB teamG 8 8\nteamB teamJ 1 3\nteamB teamL 0 0\nteamC teamF 3 1\nteamC teamH 1 3\nteamC teamI 3 3\nteamC teamK 1 3\nteamD teamE 1 2\nteamD teamG 2 1\nteamD teamJ 1 4\nteamD teamL 4 4\nteamE teamG 0 2\nteamE teamJ 4 3\nteamE teamL 2 2\nteamF teamH 1 3\nteamF teamI 2 4\nteamF teamK 3 4\nteamG teamJ 0 2\nteamG teamL 3 3\nteamH teamI 0 0\nteamH teamK 3 2\nteamH teamK 3 2\nteamH teamK 3 2\nteamI teamK 0 3\nteamJ teamL 4 4`]

    // References to access values in textareas
    const text1 = useRef()
    const text2 = useRef()

    // Restructuring data dictionary
    const responseBody = {}

    // On form submission submits query to backend to process and return rank ordered teams
    // Teams array will then update data using props function to update in parent component
    const inputChangeHandler = async (event) => {
        event.preventDefault()
        props.buttonpressed(true)
        props.rankresults([])
        const formData = new FormData(event.currentTarget)
        formData.forEach((value, property) => responseBody[property] = value);
        const teammatch = JSON.stringify(responseBody)
        const data = await fetch("/ranked",{
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: teammatch
        }).then(response => response.json())
        .then(data =>data)
        props.rankresults(data)
    }

    const empty = ()=>{
        props.buttonpressed(false)
        props.rankresults([])
    }
    
    function updatearea(nums){
        text1.current.value = text1options[nums-1]
        text2.current.value = text2options[nums-1]
    }

    return (
        <div>
            <form onSubmit={inputChangeHandler}>
                <label htmlFor="Teams" className="sr-only" style={{"marginTop":"10px"}}>Enter Team information</label>
                <textarea type="text" ref={text1} name="Teams" id="Teams" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderTeams} required></textarea>
                <label htmlFor="Matches" className="sr-only" style={{"marginTop":"10px"}}>Enter Matches information</label>
                <textarea type="text" ref={text2} name="Matches" id="Matches" className="form-control" style={{"minWidth": "100%"}} rows={10} placeholder={placeholderMatches} required></textarea>
                <button type="submit" style={{'marginTop':'10px'}} className="btn btn-info">Load data</button>
                <button type="reset" onClick={()=>empty()} style={{'marginTop':'10px', "marginLeft":"10px"}} className="btn btn-danger">reset data</button>
            </form>
            <button className="btn btn-xs btn-outline-secondary " style={{'marginTop':'10px'}} onClick={()=>updatearea(1)} >test1</button>
            <button className="btn btn-xs btn-outline-secondary " style={{'marginTop':'10px'}} onClick={()=>updatearea(2)} >test2</button>
            <button className="btn btn-xs btn-outline-secondary " style={{'marginTop':'10px'}} onClick={()=>updatearea(3)} >test3</button>

        </div>
    )
}

export default Game