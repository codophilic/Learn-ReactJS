import index from './card.css'

export default function Card(props){
    return(
        <div className='card'>
        <h2>{props.name}</h2>
        {props.children}
        </div>
        
        );
}