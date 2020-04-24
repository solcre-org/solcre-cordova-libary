import { Injectable, NgZone, ApplicationRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
	providedIn: "root"
})
export class AndroidService {

	// Inject router
	constructor(
		private router: Router,
		private zone: NgZone,
		private applicationRef: ApplicationRef){ }

	public watchBackState(){
		// Flag to detect back triggered
		let popupStateDone: boolean = false;

		// Watch navigate events
		this.router.events.subscribe((event: any) => {
			// Is popupstate (back)
			if(event.navigationTrigger === "popstate") {
				// Set flag
				popupStateDone = true;
			}
			// If navigate ends and previous popupState
			else if(event instanceof NavigationEnd && popupStateDone) {
				// Emit tick inside zone.run event to sync to angular
				this.zone.run(() => {
					this.applicationRef.tick()
				});

				// Clear popup state
				popupStateDone = false;
			}
		});
	}
}