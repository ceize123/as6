import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {
    // releases = data.albums.items;
    releases: any = [];
    musicDataSubscription: Subscription | undefined;
    constructor(private mds: MusicDataService) { }

    ngOnInit(): void {
        this.musicDataSubscription = this.mds.getNewReleases().subscribe((data: any) => this.releases = data.albums.items);
    }

    ngOnDestroy(): void { // clean up
        this.musicDataSubscription?.unsubscribe();
    }

}
