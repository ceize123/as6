import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {

    results: any;
    searchQuery: string = "";

    musicDataSubscription: Subscription | undefined;

    constructor(private router: Router, private route: ActivatedRoute, private mds: MusicDataService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe((params) => {
            let qParam = params["q"];
            this.musicDataSubscription = this.mds.searchArtists(params['q']).subscribe((data) => {
                this.results = data.artists.items.filter((curValue) => curValue.images.length > 0);
            });
            this.searchQuery = qParam;
        })
    }

    ngOnDestroy(): void { // clean up
        this.musicDataSubscription?.unsubscribe();
    }
            
}
