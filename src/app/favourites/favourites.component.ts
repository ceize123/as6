import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

    favourites: Array<any> = [];
    musicDataSubscription: Subscription | undefined;
    constructor(private mds: MusicDataService) { }

    ngOnInit(): void {
        this.musicDataSubscription = this.mds.getFavourites().subscribe((data: any) => {
            this.favourites = data.tracks;
        });
    }

    removeFromFavourites(id: any) {
        this.musicDataSubscription = this.mds.removeFromFavourites(id).subscribe((data: any) => {
            this.favourites = data.tracks;
        });
    }

    ngOnDestroy(): void { // clean up
        this.musicDataSubscription?.unsubscribe();
    }

}
