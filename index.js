import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {getStorage, listAll, ref as sRef, getDownloadURL} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/9.15.0/firebase-storage.js"
import {createApp} from 'https://unpkg.com/vue@3.2.47/dist/vue.esm-browser.prod.js'
const HomePage = createApp({
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
            email:'',
            basket:[],
            basketShow:false,
            form:false,
            total:0,
            phone:'',
            address:""
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
            setTimeout(()=>{let toggleButton = document.querySelector('.toggle-menu');
            let navBar = document.querySelector('.nav-bar');
            toggleButton.addEventListener('click', function () {
                navBar.classList.toggle('toggle');
            });
            let swiper = new Swiper(".mySwiper", {
                pagination: {
                el: ".swiper-pagination",
            },
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            });},500)
            
        }).then(()=>{
            document.querySelector(".final-buy").classList.remove('hide')
            
            document.querySelector(".show").classList.remove('hide')
            document.querySelector(".swiper").classList.remove('hide')
        })
    },
    methods:{
        toast(msg,grav,pos){
            Toastify({
                text: msg,
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: grav,
                position: pos,
                stopOnFocus: true, 
                style: {
                  background: "black",
                  fontSize:'2em'
                }
              }).showToast();
        },
        buyPage(val){
            this.btn=true,
            this.btnVal=val
            this.animation=true
            this.basket.forEach((v)=>{
                v.quantity=1;
            })
            this.basketShow=false
        },
        close(){
            this.form=false
            this.total=0
            this.basket.forEach((v)=>{
                v.quantity=1;
            })
        },
        homePage(){
            this.btn=false
            this.size=0
            this.color=''
        },
        final(){
            this.basketShow=false
            this.form=true
            
            this.basket.forEach((v)=>{
                let price = v.price.split('$')
                this.total += price[1]*v.quantity
                this.total = parseInt(this.total * 100) / 100
            })
        },
        removeFromBasket(shoe){
            for(let i = 0;i<this.basket.length;i++){
                if(this.basket[i]==shoe)this.basket.splice(i,1)
            }
        },
        buy(size,color,shoe){
            this.size=size
            this.color=color
            if(this.size!=0 && this.color.length>0){
               this.buyBtn = true
               this.btn=false
               this.toast('Item has been added to your cart','top','center')
               this.size=0
                this.color=''
                shoe.quantity = 1;
                this.basket.push(shoe)
            }
            else{
                this.buyBtn = false
            }
        },
        basketClick(){
            this.basketShow = !this.basketShow
            this.basket.forEach((v)=>{
                v.quantity=1;
            })
        },
        splitJoin(theText){
            return theText.split(';');
        },
        subscribeLetter(){
            this.toast('Succesfully subscribed','top','left')

            this.email=''
        },
        submitBuy(){
            if(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(this.phone)){
                this.toast('Thanks for your purchace','top','left')
                this.form=false
                this.email=''
                this.phone=''
                this.basket=[]
                this.basketShow=false
            }
            else{
                this.toast('Invalid phone number or adress','top','center')

            }
        }
    }
})
HomePage.mount('#HomePage')
