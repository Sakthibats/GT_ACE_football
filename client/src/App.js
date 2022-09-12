import { useState } from 'react';
import Footer from './components/Footer';
import Game from './components/Game';
import Header from './components/Header';
import Results from './components/Results';

function App() {

	const [rankdata, setRankdata] = useState([])
	const [buttonbool, setbuttonbool] = useState(false)
	console.log(rankdata)


	function Spinner(){
		return(
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		)
	}

	return (
		<div className='container'>
			<Header/>
			<Game rankresults={setRankdata} buttonpressed={setbuttonbool}/>
			<hr/>
			<h3> Results</h3>
			{buttonbool?(rankdata.group1? <Results alldata={rankdata}/> : <Spinner />): <br/>}
			<Footer />
		</div>
	);
}

export default App;
