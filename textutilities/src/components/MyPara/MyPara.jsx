import MyParaCSS from './MyPara.module.css';

export default function MyPara() {
    console.log(MyParaCSS)
    return (
        <div className={MyParaCSS.card}>
            <p className={MyParaCSS.para}>This is Paragraphy</p>
            <p className={MyParaCSS.para}>
                    This is another paragraph</p>
        </div>
    );
}