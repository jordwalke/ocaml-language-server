import Session from "../session";

export default class Esy {
  constructor(private readonly session: Session) {}

  public run(): Promise<string> {
    let buffer = "";
    return new Promise(resolve => {
      const command = this.session.settings.reason.path.esy;
      const args = ["build"];
      const process = this.session.environment.spawn(command, args);

      process.on("error", (error: Error & { code: string }) => {
        if (error.code === "ENOENT") {
          const msg = `Perhapse we cannot find esy binary at "${command}".`;
          this.session.connection.window.showWarningMessage(msg);
          this.session.connection.window.showWarningMessage(
            `Double check your path or try configuring "reason.path.esy" under "User Settings". Do you need to "npm install -g esy"? Alternatively, disable "esy" in "reason.diagnostics.tools"`,
          );
        }
        resolve("");
      });
      process.stdout.on(
        "data",
        (data: Buffer | string) => (buffer += data.toString()),
      );
      process.stdout.on("end", () => resolve(buffer));
    });
  }
}
