// Target interface
interface MediaPlayer {
  playAudio(fileName: string): void;
}

// Adaptee with an incompatible interface
class ThirdPartyMP3Player {
  public playMP3(fileName: string): void {
    console.log(`Playing MP3 file: ${fileName}`);
  }
}

// Adapter class
class MP3Adapter implements MediaPlayer {
  private mp3Player: ThirdPartyMP3Player;

  constructor(mp3Player: ThirdPartyMP3Player) {
    this.mp3Player = mp3Player;
  }

  public playAudio(fileName: string): void {
    // Delegates the call to the adaptee's method
    this.mp3Player.playMP3(fileName);
  }
}

// Usage with Dependency Injection
class Client {
  public mediaPlayer: MediaPlayer;

  // Dependency injection of the adapter
  constructor(mediaPlayer: MediaPlayer) {
    this.mediaPlayer = mediaPlayer;
  }

  public playMedia() {
    this.mediaPlayer.playAudio("song.mp3");
  }
}

// Create the adaptee
const thirdPartyMP3Player = new ThirdPartyMP3Player();
// Create the adapter with the adaptee
const mp3Adapter = new MP3Adapter(thirdPartyMP3Player);
// Inject the adapter into the client code
const main = new Client(mp3Adapter);

// Play media using the adapter
main.playMedia(); // Output: Playing MP3 file: song.mp3
