import * as server from "vscode-languageserver";
import { types } from "../../../lib";
import * as command from "../command";
import Session from "../session";

export default function(
  session: Session,
): server.RequestHandler<types.TextDocumentIdentifier, string[], void> {
  return event => command.getAvailableLibraries(session, event);
}
