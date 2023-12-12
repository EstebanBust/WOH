import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TimerWithProgress from './timers/BasicTimer';
import TimerWithInterval from './timers/TimerInterval';
import TimerEmom from './timers/TimerEmom';
import Navigation from './Nav';
import Footer from './footer';

function App() {  

  return (
    <main>
      <div className="container">
       <Navigation />
        
        <div className="row">
          <TimerWithProgress initialDuration={60}/>
          <TimerWithInterval/>
          <TimerEmom />
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default App
