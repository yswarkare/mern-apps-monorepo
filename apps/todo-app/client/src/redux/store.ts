import { applyMiddleware, createStore, compose } from 'redux'
import monitorReducerEnhancer from './monitorReducerEnhancer'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from './loggerMiddleware'
// import rootReducer from './reducers'



export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer]
  const composedEnhancers = compose(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}