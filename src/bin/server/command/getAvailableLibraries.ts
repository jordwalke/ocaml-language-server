import * as server from "vscode-languageserver";
import * as processes from "../processes";
import Session from "../session";

export default async function(
  session: Session,
  _: server.TextDocumentIdentifier,
): Promise<string[]> {
  const ocamlfind = new processes.Ocamlfind(session).process;
  ocamlfind.stdin.end();
  const otxt = await new Promise<string>((resolve, reject) => {
    let buffer = "";
    ocamlfind.stdout.on("error", (error: Error) => reject(error));
    ocamlfind.stdout.on(
      "data",
      (data: Buffer | string) => (buffer += data.toString()),
    );
    ocamlfind.stdout.on("end", () => resolve(buffer));
  });
  ocamlfind.unref();
  return /^\s*$/.test(otxt) ? [] : otxt.trim().split("\n");
}
