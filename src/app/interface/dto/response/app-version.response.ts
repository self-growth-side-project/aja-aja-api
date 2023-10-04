import { Exclude, Expose } from 'class-transformer';

export class RecommendedUpdateResponse {
  thresholdVersion!: string;

  title!: string;

  message!: string;

  constructor(thresholdVersion: string, title: string, message: string) {
    this.thresholdVersion = thresholdVersion;
    this.title = title;
    this.message = message;
  }
}

export class ForceUpdateResponse {
  thresholdVersion!: string;

  title!: string;

  message!: string;

  constructor(thresholdVersion: string, title: string, message: string) {
    this.thresholdVersion = thresholdVersion;
    this.title = title;
    this.message = message;
  }
}

export class AppVersionResponse {
  @Exclude({ toPlainOnly: true })
  private readonly _latestVersion: string;

  @Exclude({ toPlainOnly: true })
  private readonly _recommendedThresholdVersion: string;

  @Exclude({ toPlainOnly: true })
  private readonly _recommendedTitle: string;

  @Exclude({ toPlainOnly: true })
  private readonly _recommendedMessage: string;

  @Exclude({ toPlainOnly: true })
  private readonly _forceThresholdVersion: string;

  @Exclude({ toPlainOnly: true })
  private readonly _forceTitle: string;

  @Exclude({ toPlainOnly: true })
  private readonly _forceMessage: string;

  @Expose()
  get latestVersion(): string {
    return this._latestVersion;
  }

  @Expose()
  get recommendedUpdate(): RecommendedUpdateResponse {
    return new RecommendedUpdateResponse(
      this._recommendedThresholdVersion,
      this._recommendedTitle,
      this._recommendedMessage,
    );
  }

  @Expose()
  get forceUpdate(): ForceUpdateResponse {
    return new ForceUpdateResponse(this._forceThresholdVersion, this._forceTitle, this._forceMessage);
  }

  constructor(
    latestVersion: string,
    recommendedThresholdVersion: string,
    recommendedTitle: string,
    recommendedMessage: string,
    forceThresholdVersion: string,
    forceTitle: string,
    forceMessage: string,
  ) {
    this._latestVersion = latestVersion;
    this._recommendedThresholdVersion = recommendedThresholdVersion;
    this._recommendedTitle = recommendedTitle;
    this._recommendedMessage = recommendedMessage;
    this._forceThresholdVersion = forceThresholdVersion;
    this._forceTitle = forceTitle;
    this._forceMessage = forceMessage;
  }
}
