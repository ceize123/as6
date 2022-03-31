import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
    album: any = {};
    paramsSubscription: Subscription | undefined;
    musicDataSubscription: Subscription | undefined;
    addToFavouritesSubscription: Subscription | undefined;

    constructor(private snackBar: MatSnackBar, private route: ActivatedRoute, private mds: MusicDataService) { }

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            let idParam = params["id"];
            this.musicDataSubscription = this.mds.getAlbumById(idParam).subscribe((data: any) => {
                this.album = data;
            });
        })
    }

    addToFavourites(trackID: any): void{
        this.addToFavouritesSubscription = this.mds.addToFavourites(trackID).subscribe(
            (success) => {
                    this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
                },
            (err) => {
                this.snackBar.open("Unable to add song to Favourites...", "Done", { duration: 1500 });
            });

        // if (this.mds.addToFavourites(trackID)) {
        //     this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
        // };
    }

    ngOnDestroy(): void { // clean up
        this.musicDataSubscription?.unsubscribe();
        this.paramsSubscription?.unsubscribe();
    }
}
