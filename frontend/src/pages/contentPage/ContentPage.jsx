import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
// import Carousel from '../../components/Shared/Carousel/Carousel';
import SliderList from '../../components/Shared/SliderList/SliderList';
import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Billboard from '../../components/Shared/Billboard/Billboard';

const ContentPage = () => {
    let includeMyList, apiEndpoint;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [myList, setMyList] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [content, setContent] = useState(null);
    const [billboardData, setBillboardData] = useState();

    // const defaultMovie = {
    //     title: 'Spider-Man: Into the Spider-Verse',
    //     description:
    //         'Spider-Man: Into the Spider-Verse is a 2018 American computer-animated superhero film based on the Marvel Comics character Miles Morales / Spider-Man, produced by Columbia Picturess and Sony Picturesp Animation in associationi with Marvel,d and distributed bye Sonyr Pictures Releasing.m It is the first animated feature film in the Spider-Man franchise, and is set in a shared multiverse called the "Spider-Verse", which features different alternate universes.',
    //     img: 'https://images8.alphacoders.com/929/thumb-1920-929202.jpg',
    //     imgTitle:
    //         'https://www.pngmart.com/files/12/Spider-Man-Into-The-Spider-Verse-Logo-PNG-Clipart.png',
    //     imgThumb:
    //         'https://m.media-amazon.com/images/M/MV5BOTFlZTA4YjUtYzY3Zi00Mzc2LTllNzAtYjI2ZWNiMGZkZjE2XkEyXkFqcGdeQW1yb3NzZXI@._V1_QL75_UY281_CR86,0,500,281_.jpg',
    //     imgVertical: 'https://cdn.marvel.com/content/2x/MilesPoster.jpg',
    //     trailer: 'https://youtu.be/g4Hbz2jLxvQ',
    //     movie: 'https://youtu.be/g4Hbz2jLxvQ',
    //     duration: '1 hour 57 min',
    //     year: '2018',
    //     limit: '13',
    //     genre: 'Animation',
    //     isSeries: false
    // }


    const getContent = async () => {
        ctxDispatch({ type: GET_REQUEST });
        try {
            const { data } = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${userInfo.token}` },
            });

            setContent(data);
            ctxDispatch({ type: GET_SUCCESS, payload: data });

            if (includeMyList) {
                const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                setMyList([myListFromDB.data])
                ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
            }
        } catch (err) {
            console.error(err);
            navigate("/signin");
        }
    };

    useEffect(() => {
        if (!userInfo) {
            navigate("/signin");
        } else {
            // change content by url
            if (location.pathname === "/") {
                includeMyList = true;
                apiEndpoint = "/api/v1/content"
            }
            else if (location.pathname === '/movies') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/movies"
            }
            else if (location.pathname === '/series') {
                includeMyList = false;
                apiEndpoint = "/api/v1/content/series"
            }

            getContent();
        }
    }, []);

    useEffect(() => {
        generateRandomNumber();
    }, [content])


    const generateRandomNumber = () => {
        if (!content || content.length == 0) {
            return;
        }
        const newRandomNumber = Math.floor(Math.random() * (content.length));
        setBillboardData(content[newRandomNumber].contentList[0]);
    };

    return (
        <div>
            <Billboard item={billboardData} />
            {/* <Carousel /> */}
            {myList &&
                <SliderList contentList={myList} />
            }
            <SliderList contentList={content} />
        </div>
    );
};

export default ContentPage;



// import React, { useContext, useEffect, useState } from 'react';
// import { Store } from '../../Store';
// import NavBar from '../../components/Shared/NavBar/NavBar';
// import Carousel from '../../components/Shared/Carousel/Carousel';
// import SliderList from '../../components/Shared/SliderList/SliderList';
// import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ContentPage = ({ includeMyList, apiEndpoint }) => {
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { userInfo } = state;
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [myList, setMyList] = useState(null);
//     const navigate = useNavigate();
//     const [content, setContent] = useState(null);

//     const getContent = async () => {
//         ctxDispatch({ type: GET_REQUEST });
//         try {
//             const { data } = await axios.get(apiEndpoint, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });

//             setContent(data);

//             ctxDispatch({ type: GET_SUCCESS, payload: data });

//             if (includeMyList) {
//                 const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
//                     headers: { Authorization: `Bearer ${userInfo.token}` },
//                 });

//                 setMyList([myListFromDB.data])
//                 console.log('my list from sb', myListFromDB.data)
//                 ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
//             }
//         } catch (err) {
//             console.error(err);
//               navigate("/signIn");
//         }
//     };

//     useEffect(() => {
//         if (!userInfo) {
//             navigate("/signIn");
//         } else {
//             getContent();
//         }

//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);

//     return (
//         <div>
//             <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
//             <Carousel />
//             {includeMyList &&
//                 <SliderList contentList={myList} />
//             }
//             <SliderList contentList={content} />
//         </div>
//     );
// };

// export default ContentPage;













// import React, { useContext, useEffect, useState } from 'react';
// import { Store } from '../../Store';
// import NavBar from '../../components/Shared/NavBar/NavBar';
// import Carousel from '../../components/Shared/Carousel/Carousel';
// import SliderList from '../../components/Shared/SliderList/SliderList';
// import { GET_REQUEST, GET_SUCCESS, MY_LIST } from '../../reducers/actions';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ContentPage = ({ name, includeMyList, apiEndpoint }) => {
//     const { state, dispatch: ctxDispatch } = useContext(Store);
//     const { userInfo } = state;
//     const [isScrolled, setIsScrolled] = useState(false);
//     const [myList, setMyList] = useState(null);
//     const navigate = useNavigate();
//     const [content, setContent] = useState({
//         allContent: null,
//         moviesContent: null,
//         seriesContent: null,
//         myListContent: null
//     });

//     const getContent = async () => {
//         ctxDispatch({ type: GET_REQUEST });
//         try {
//             const { data } = await axios.get(apiEndpoint, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` },
//             });

//             console.log(name)
//             console.log('API Response:', data);
//             // setContent({ ...content, [name]: data });
//             setContent(prevContent => ({ ...prevContent, [name]: data })); // Use the updater function
//             console.log(content[name])
//             // setContent(data);

//             ctxDispatch({ type: GET_SUCCESS, payload: data });

//             if (includeMyList) {
//                 const myListFromDB = await axios.get(`/api/v1/content/myList/${userInfo['_id']}`, {
//                     headers: { Authorization: `Bearer ${userInfo.token}` },
//                 });
//                 // setContent({ ...content, ['myListContent']: myListFromDB.data.contentList });
//                 setContent(prevContent => ({ ...prevContent, myListContent: myListFromDB.data.contentList }));
//                 // setMyList([myListFromDB.data])
//                 console.log('consdfjlskdfj ', content)
//                 console.log('my list from sb', myListFromDB.data)
//                 ctxDispatch({ type: MY_LIST, payload: myListFromDB.data.contentList })
//             }
//         } catch (err) {
//             console.error(err);
//             navigate("/signIn");
//         }
//     };

//     useEffect(() => {
//         if (!userInfo) {
//             navigate("/signIn");
//         } else {
//             console.log('dfsdfsdfasdfasdfasdfdsa',content)
//             if(!content[name]){
//                 console.log('dfsdfsdfasdfasdfasdfdsa',content)
//                 getContent();
//             }
//         }

//         const handleScroll = () => {
//             if (window.scrollY > 0) {
//                 setIsScrolled(true);
//             } else {
//                 setIsScrolled(false);
//             }
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, [userInfo, content, name, getContent]);

//     useEffect(() => {
//         console.log('asdjklfasdl;kfjalksdjfal;skdfjas;dlkfjasl;dkfjal;sdkfja;lsdkjfa;lskdjfa;lksdjf')
//         console.log(content);
//     }, [content]);

//     return (
//         <div>
//             <NavBar className={isScrolled ? 'navBarInHomePage scrolled' : 'navBarInHomePage'} />
//             <Carousel />
//             {console.log(content['myListContent'])}
//             {includeMyList &&
//                 // <SliderList contentList={myList} />
//                 <>
//                 <SliderList contentList={content.myListContent} />
//                 {console.log(includeMyList)}
//                 </>
//             }
//             {/* <SliderList contentList={content[name]} /> */}
//             {console.log(content)}
//             {/* {content && content[name] && <SliderList contentList={content[name]} />} */}
//         </div>
//     );
// };

// export default ContentPage;

