import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetail {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  private selectedId = toSignal(
    this.route.paramMap.pipe(map((params) => Number(params.get('id')))),
    { initialValue: 0 }
  );

  user = this.userService.selectedUser;
  loading = this.userService.detailLoading;
  error = this.userService.detailError;

  constructor() {
    effect(() => {
      const id = this.selectedId();
      if (id > 0) {
        this.userService.loadUserById(id);
      }
    });
  }
}
