import conf from '../conf/conf'

import { Client, ID, Storage, Databases, Query } from 'appwrite'

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, featuredImage, userId, content,status }) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    featuredImage,
                    userId,
                    content,
                    status,
                }
            )
        } catch (error) {
            console.log('Appwrite service :: createPost :: error', error)
            return false
        }
    }

    async updatePost(slug, { title, featuredImage, content }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId,
                slug,
                {
                    title,
                    featuredImage,
                    content
                }
            )
        } catch (error) {
            console.log('Appwrite service :: updatePost :: error', error)
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite service :: deletePost :: error', error)
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log('Appwrite service :: getPost :: error', error)
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId,
                conf.collectionId,
                queries
            )
        } catch (error) {
            console.log('Appwrite service :: getPosts :: error', error)
            return false
        }
    }


    // file upload service ---


    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('Appwrite service :: uploadFile :: error', error)
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
        } catch (error) {
            console.log('Appwrite service :: deleteFile :: error', error)
            return false
        }
    }

     getFilePreview(fileId) {


        if (!fileId) {
            console.error("File ID is missing for getFilePreview");
            return ''; // Return an empty string or default image URL
        }
       
            return  this.bucket.getFilePreview(
                conf.bucketId,
                fileId
            )
        
    }

}


const service = new Service;

export default service;