import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';

import { mergeMap } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

    // favouritesList: Array<any> = [];

    constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

        // For the inner "get" request to be successful, it must provide an "Authentication" header consisting of the value 
        // "Bearer token", where token is first obtained by invoking the getBearerToken() method of the SpotifyTokenService.
    getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
            return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` }});
        }));
    }

    getArtistById(id: any): Observable<SpotifyApi.SingleArtistResponse> {
        //making a GET request to the Spotify endpoint
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
            return this.http.get<SpotifyApi.SingleArtistResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` }});
        }));
    }

    getAlbumsByArtistId(id: any): Observable<SpotifyApi.ArtistsAlbumsResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
            return this.http.get<SpotifyApi.ArtistsAlbumsResponse>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, { headers: { "Authorization": `Bearer ${token}` }});
            // include_groups=album,single
            // limit=50
        }));
    }

    getAlbumById(id: any): Observable<SpotifyApi.SingleAlbumResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
            return this.http.get<SpotifyApi.SingleAlbumResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` }});
        }));
    }

    searchArtists(searchString: any): Observable<SpotifyApi.ArtistSearchResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
            return this.http.get<SpotifyApi.ArtistSearchResponse>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, { headers: { "Authorization": `Bearer ${token}` }});
            // q=searchString – where searchString is the value of the "searchString" parameter
            // type=artist
            // limit=50
        }));
    }

    addToFavourites(id:string): Observable<[String]> {
        // make a PUT request to environment.userAPIBase/favourites/:id to add id to favourites
        return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, {});
    }

    removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
        // Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
                let favItem = favouritesArray.join();
                return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favItem}`, { headers: { "Authorization": `Bearer ${token}` } });
            }));
        } else {
            return new Observable(o=>o.next({tracks: []}));
        }
    }));
    }

    getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
        // Perform the same tasks as the original getFavourites() method, only using "favouritesArray" from above, instead of this.favouritesList
        // NOTE: for the empty array, you will need to use o=>o.next({tracks: []}) instead of o=>{o.next([])}
        if (favouritesArray.length > 0) {
            return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
                let favItem = favouritesArray.join();
                return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favItem}`, { headers: { "Authorization": `Bearer ${token}` } });
            }));
        } else {
            return new Observable(o=>o.next({tracks: []}));
        }
    }));
    }

    // addToFavourites(id: any) {
    //     if (id === null || id === undefined || this.favouritesList.length >= 50) {
    //         return false;
    //     } else {
    //         this.favouritesList.push(id);
    //         return true;
    //     }
    // }

    // removeFromFavourites(id: any): Observable<any> {
    //     this.favouritesList.splice(this.favouritesList.indexOf(id), 1);
    //     return this.getFavourites();
    // }

    // getFavourites(): Observable<any>  {
    //     if (this.favouritesList.length > 0) {
    //         return this.spotifyToken.getBearerToken().pipe(mergeMap(token => { 
    //             let favItem = this.favouritesList.join();
    //             // return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${this.favouritesList.join()}`, { headers: { "Authorization": `Bearer ${token}` } })
    //             return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favItem}`, { headers: { "Authorization": `Bearer ${token}` } });
    //         }));
    //     } else {
    //         return new Observable(o=>{o.next([])});
    //     }
    // }

}