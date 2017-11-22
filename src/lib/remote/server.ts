import { RequestType } from "vscode-jsonrpc";
import { TextDocumentIdentifier } from "vscode-languageserver-types";
import * as merlin from "../merlin";
import { IColumnLine } from "../merlin/ordinal";
import * as types from "../types";

export const giveCaseAnalysis = new RequestType<
  types.ITextDocumentRange,
  null | merlin.Case.Destruct,
  void,
  void
>("reason.server.giveCaseAnalysis");

export const giveMerlinFiles = new RequestType<
  types.TextDocumentIdentifier,
  string[],
  void,
  void
>("reason.server.giveMerlinFiles");

export const giveAvailableLibraries = new RequestType<
  types.TextDocumentIdentifier,
  string[],
  void,
  void
>("reason.server.giveAvailableLibraries");

export const giveProjectEnv = new RequestType<
  types.TextDocumentIdentifier,
  string[],
  void,
  void
>("reason.server.giveProjectEnv");

export const giveFormatted = new RequestType<
  types.IUnformattedTextDocument,
  null | string,
  void,
  void
>("reason.server.giveFormatted");

const __: IColumnLine | TextDocumentIdentifier | null = null;
void __; // tslint:disable-line no-unused-expression
