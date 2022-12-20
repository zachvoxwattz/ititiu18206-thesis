import '../../assets/css/eventprocessor/main.css'

const EventProcessor = (props) => {

    let appUtils = props.appUtils
        let savedDataLog = appUtils.savedDataLog
        // let setSavedDataLog = appUtils.setSavedDataLog

    return(
        <div id = 'eventProcessor'>
            <button onClick={() => { console.log(savedDataLog) }}>Click</button>
            <p id = 'test'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nisl sapien, auctor nec placerat vitae, feugiat ut ligula. Maecenas pulvinar sapien in massa vehicula mattis sit amet quis nunc. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nam accumsan ultrices finibus. Cras tincidunt urna eu magna ultricies, eu blandit ligula porta. Phasellus lobortis orci volutpat ullamcorper volutpat. Proin nec blandit diam. Quisque at sollicitudin tortor. Duis molestie ultrices ipsum. Donec eu pharetra eros. Morbi in laoreet turpis. Donec et imperdiet leo, vitae vestibulum libero. Sed pulvinar nisl felis, eget cursus lorem auctor id.
                <br/><br/>
                Mauris iaculis malesuada mauris a porttitor. Maecenas ac magna ultricies, faucibus ipsum quis, commodo ligula. Pellentesque eu erat placerat, porttitor risus ac, eleifend erat. Vestibulum facilisis vitae metus non blandit. Mauris facilisis eleifend leo at ornare. Duis placerat lorem nec congue tempus. Quisque gravida massa vel arcu commodo, sed blandit ligula vehicula. Mauris nec fermentum tellus. Mauris est arcu, lacinia nec venenatis et, vestibulum eu erat. Donec commodo auctor eros eu lobortis. Aenean vitae viverra risus.
                <br/><br/>
                Sed augue erat, rutrum id pellentesque non, molestie nec quam. Praesent gravida ultricies volutpat. Nullam consectetur sem sapien. Nullam felis turpis, facilisis in erat eu, convallis pretium ex. Donec pharetra nunc vitae urna bibendum, at lobortis ante consequat. Vivamus sollicitudin, ipsum sed vestibulum fringilla, velit odio malesuada ex, at placerat lacus elit in nisi. Aenean ullamcorper et leo non luctus. Integer augue leo, consectetur eu felis ut, porta lacinia augue. Nunc quis augue tincidunt, tincidunt urna a, sollicitudin odio. Maecenas vel lectus a arcu aliquam malesuada. Aliquam iaculis mi a diam fermentum, sed porta sapien laoreet. Phasellus ut dolor tristique, elementum dui eget, bibendum mi. Aenean ultricies, nisi sit amet dapibus pellentesque, neque urna aliquam enim, eget pellentesque augue odio ac est.
                <br/><br/>
                Nunc eget felis nunc. Pellentesque eu luctus velit. Sed eu egestas eros. Integer consequat nulla lectus, et placerat dolor facilisis sed. Suspendisse sapien ipsum, condimentum eu rhoncus eu, accumsan at erat. Proin vulputate ex ornare, suscipit dui sed, varius sem. Praesent a quam vel sem pulvinar pellentesque.
                <br/><br/>
                Nullam non ipsum in sapien semper semper maximus nec erat. Integer congue turpis eget dui sollicitudin, sed sodales neque pulvinar. Vivamus varius mauris ante, id finibus lectus porttitor a. Duis purus est, porttitor at urna nec, vulputate posuere libero. Fusce sodales non sem in placerat. Aenean gravida ut arcu eu mattis. Praesent iaculis dolor vitae sem mattis vehicula. Fusce rhoncus libero ut odio gravida, quis luctus purus ullamcorper. Sed gravida finibus massa vel venenatis. Donec non ex metus. Donec ac eros sit amet sem iaculis vulputate.
            </p>
        </div>
    )
}

export default EventProcessor
