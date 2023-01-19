import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {getStorage, listAll, ref as sRef, getDownloadURL} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.15.0/firebase-storage.js"
const HomePage = Vue.createApp({
    data(){
        return{
            dataArr:[],
            imageName:[],
            imageArr:[],
            btn:false,
            btnVal:'',
            loaded:false,
            size:0,
            color:'',
            colorArr:[],
            buyBtn:true,
            animation:false,
            email:''
        }
    },
    methods:{
        buyPage(val){
            this.btn=true,
            this.btnVal=val
            this.animation=true
        },
        homePage(){
            this.btn=false
            this.size=0
            this.color=''
        },
        buy(size,color){
            this.size=size
            this.color=color
            if(this.size!=0 && this.color.length>0){
               this.buyBtn = true
               this.btn=false
               alert('Thanks for your purchase')
               this.size=0
                this.color=''
            }
            else{
                this.buyBtn = false
            }
        },
        splitJoin(theText){
            return theText.split(';');
        },
        subscribeLetter(){
            alert('succesfully subscribed')
            this.email=''
        }
    },
    mounted(){
        const firebaseConfig = {
            apiKey: "AIzaSyBM6qav41QKCyf4elCPn5i5SMvIDYUSk7o",
            authDomain: "final-js-3cba1.firebaseapp.com",
            databaseURL: "https://final-js-3cba1-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "final-js-3cba1",
            storageBucket: "final-js-3cba1.appspot.com",
            messagingSenderId: "1028957489500",
            appId: "1:1028957489500:web:4a3572884b269f4a7d1999",
            measurementId: "G-8R8MVP520K"
        };
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        const starCountRef = ref(db, 'shoes');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            for(let i in data){
                this.dataArr.push(data[i])
            }
        });


        const storage = getStorage(app);
        
        
        const images = sRef(storage,'images/')
        
        listAll(images)
            .then((res) => {
                res.prefixes.forEach((folderRef) => {
                    console.log(folderRef)
                });
                res.items.forEach((itemRef) => {
                    this.imageName.push(itemRef._location.path) 
                });
            }).catch((error) => {
                console.log(error)
        }).then(()=>{
            for(let i=0;i<this.imageName.length;i++){
                let imagesRef = sRef(storage,`${this.imageName[i]}`)
                getDownloadURL(imagesRef).then((url)=>{
                  this.imageArr.push(url)
              })
            }
        }).then(()=>{
            this.loaded=true
            
        }).then(()=>{
            let toggleButton = document.querySelector('.toggle-menu');
            let navBar = document.querySelector('.nav-bar');
            toggleButton.addEventListener('click', function () {
                navBar.classList.toggle('toggle');
            });
            var swiper = new Swiper(".mySwiper", {
                pagination: {
                el: ".swiper-pagination",
            },
            speed: 1000,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            });
        })
    }
})
HomePage.mount('#HomePage')

