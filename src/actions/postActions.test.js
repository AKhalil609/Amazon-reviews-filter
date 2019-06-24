import moxios from 'moxios';
import { storeFactory } from '../TestUtils/utils'
import { fetchPosts } from './postActions'
import responseData from  '../__tests__/dummyData.json'

describe('fetchPosts action creator', () => {
    let initalState;
    const reviews = responseData;
    const store = storeFactory();
    beforeEach(()=>{
        moxios.install();
        

        moxios.wait(()=>{
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status:200,
                response: reviews
            })
        })
    });
    afterEach(()=>{
        moxios.uninstall();
    }) 

    test('adds response data to state original', () => {
        return store.dispatch(fetchPosts()).then(()=>{
            const newState = store.getState().posts;
            expect(newState.original).toEqual(reviews);
        })
        
    })

    test('items state should only have 5 star reviews', () => {
        return store.dispatch(fetchPosts()).then(()=>{
            const newState = store.getState().posts;
            
            let filteredR = reviews.reviews.filter(e => e.stars == 5)

            expect(newState.items.reviews).toStrictEqual(filteredR);
        })
    })

    test('page state should be equal 2', () => {
        return store.dispatch(fetchPosts()).then(()=>{
            const newState = store.getState().posts;

            expect(newState.page).toBe(2);
        })
    })
    test('loading state should be false', () => {
        return store.dispatch(fetchPosts()).then(()=>{
            const newState = store.getState().posts;

            expect(newState.loading).toBe(false);
        })
    })
    
    
    
})
