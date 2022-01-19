
import createEasyFirestore from 'vuex-easy-firestore'

export const ProjectModule = {
   firestorePath: "projects",
   firestoreRefType: 'collection',
   moduleName: 'ProjectModule',
   statePropName: 'Project',
   // your state
   state: {
    Project: []
   },
   
   getters : {
     getProject: state => state.Project
 }
 } 

 export const CategoryModule = {
    firestorePath: "categories/",
    firestoreRefType: 'collection',
    moduleName: 'CategoryModule',
    statePropName: 'Category',
    // your state
    state: {
     Category: []
    },
    
    getters : {
      getCategory: state => state.Category
  }
  } 

     
 export const easyFirestore = createEasyFirestore([ProjectModule,CategoryModule], {logging: true})