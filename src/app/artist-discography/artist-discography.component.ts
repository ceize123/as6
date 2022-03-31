import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
    // albums = albumData.items.filter((curValue, index, self) =>
    //     self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
    // artist = artistData;
    albums: any = {};
    artist: any = {};
    paramsSubscription: Subscription | undefined;
    musicDataSubscription: Subscription | undefined;

    constructor(private route: ActivatedRoute, private mds: MusicDataService) { }

    ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            let idParam = params["id"];
            this.musicDataSubscription = this.mds.getArtistById(idParam).subscribe((data: any) => this.artist = data);
            this.musicDataSubscription = this.mds.getAlbumsByArtistId(idParam).subscribe(data => {
                this.albums = data.items.filter((curValue, index, self) =>
                    self.findIndex(t => t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
            });
        })
    }

    ngOnDestroy(): void { // clean up
        this.musicDataSubscription?.unsubscribe();
        this.paramsSubscription?.unsubscribe();
    }

}
