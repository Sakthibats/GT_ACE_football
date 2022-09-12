import React from 'react'
// Takes in ranked order of teams and renders them in tabular format
function Results(props) {

    // Functional component to render table given input. First four row will have different CSS styling to indicate next round progression
    function TableObj(data){
        let rowcount = 0
        return(
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Rank #</th>
                            <th scope="col">TeamName</th>
                            <th scope="col">Points</th>
                            <th scope="col">Goals</th>
                            <th scope="col">AltPoint</th>
                            <th scope="col">Date registered</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data.map((element)=>{
                            rowcount +=1
                            if (rowcount<=4){
                                return(
                                    <tr className='table-success' key={element.name}>
                                        <th scope="row">{rowcount}</th>
                                        <td>{element.name}</td>
                                        <td>{element.points}</td>
                                        <td>{element.goals}</td>
                                        <td>{element.altpoints}</td>
                                        <td>{element.date.split('T')[0]}</td>
                                    </tr>
                                )
                            }else{
                                return(
                                    <tr className='table-danger'>
                                        <th scope="row">{rowcount}</th>
                                        <td>{element.name}</td>
                                        <td>{element.points}</td>
                                        <td>{element.goals}</td>
                                        <td>{element.altpoints}</td>
                                        <td>{element.date.split('T')[0]}</td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                <h5> The following teams advance to the next stage: </h5>
                {data.data.slice(0,4).map((element)=>{
                    return(
                        <span style={{"marginRight":"10px"}} >{element.name}</span>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <h5> Group 1</h5>
            <TableObj data={props.alldata.group1}/>
            <hr/>
            <h5> Group 2 </h5>
            <TableObj data={props.alldata.group2}/>
            

        </div>
    )
}

export default Results