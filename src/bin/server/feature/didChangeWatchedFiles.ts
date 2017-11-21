import * as server from "vscode-languageserver";
import * as command from "../command";
import Session from "../session";

export default function(
  session: Session,
): server.NotificationHandler<server.DidChangeWatchedFilesParams> {
  return async event => {
    for (const id of event.changes) {
      if (/\.(ml|re)$/.test(id.uri)) return session.indexer.refreshSymbols(id);
      if (/\.(merlin)$/.test(id.uri)) return command.restartMerlin(session);
      if (/(command-env-exec)$/.test(id.uri))
        return command.restartMerlin(session);
      if (/(command-env-exec.cmd)$/.test(id.uri))
        return command.restartMerlin(session);
    }
  };
}
