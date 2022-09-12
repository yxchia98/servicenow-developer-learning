var localRec = new GlideRecord("sys_update_set");
localRec.get("e4fa5d8b877111107cec76e4dabb35fe");
gs.print(localRec);
var usp = new UpdateSetUtil();
var remoteID = usp.exportUpdateSet(localRec);
gs.print(remoteID);
var result = "";
var remoteUpdateSetGR = new GlideRecord("sys_remote_update_set");
// var remoteUpdateSet = remoteUpdateSetGR.get(remoteID);
remoteUpdateSetGR.addQuery("sys_id", remoteID);
remoteUpdateSetGR.query();
result = remoteUpdateSetGR.hasNext()
  ? serializeRecord(remoteUpdateSetGR.next())
  : "";
// while (remoteUpdateSetGR.next()) {
//   // 		Add header
//   var tf = Packages.javax.xml.transform.sax.SAXTransformerFactory.newInstance();
//   var hd = tf.newTransformerHandler();
//   var serializer = hd.getTransformer();
//   serializer.setOutputProperty(
//     Packages.javax.xml.transform.OutputKeys.ENCODING,
//     "UTF-8"
//   );
//   serializer.setOutputProperty(
//     Packages.javax.xml.transform.OutputKeys.INDENT,
//     "yes"
//   );
//   var outputStream = new Packages.java.io.ByteArrayOutputStream();
//   var streamResult = new Packages.javax.xml.transform.stream.StreamResult(
//     outputStream
//   );
//   hd.setResult(streamResult);
//   hd.startDocument();
//   var attr = new GlidesoftGlideAttributesImpl();
//   attr.addAttribute("unload_date", GlideSysDateUtil.getUMTDateTimeString());
//   hd.startElement("", "", "unload", attr);
//   // 		Update Set
//   var recordSerializer = new GlideRecordXMLSerializer();
//   recordSerializer.setApplySecurity(true);
//   recordSerializer.serialize(
//     record,
//     hd,
//     new Packages.java.lang.String("INSERT_OR_UPDATE")
//   );

//   // 		XML Rows
//   var child = new GlideRecord("sys_update_xml");
//   child.addQuery("remote_update_set", remoteID);
//   child.query();
//   while (child.next()) {
//     recordSerializer.setApplySecurity(true);
//     recordSerializer.serialize(
//       child,
//       hd,
//       new Packages.java.lang.String("INSERT_OR_UPDATE")
//     );
//   }

//   // 		close and set XML footers
//   hd.endElement("", "", "unload");
//   hd.endDocument();
//   outputStream.close();
//   result = outputStream.toString();
//   break
// }
// return result;

function serializeRecord(record) {
  // 		Add header
  var tf = Packages.javax.xml.transform.sax.SAXTransformerFactory.newInstance();
  var hd = tf.newTransformerHandler();
  var serializer = hd.getTransformer();
  serializer.setOutputProperty(
    Packages.javax.xml.transform.OutputKeys.ENCODING,
    "UTF-8"
  );
  serializer.setOutputProperty(
    Packages.javax.xml.transform.OutputKeys.INDENT,
    "yes"
  );
  var outputStream = new Packages.java.io.ByteArrayOutputStream();
  var streamResult = new Packages.javax.xml.transform.stream.StreamResult(
    outputStream
  );
  hd.setResult(streamResult);
  hd.startDocument();
  var attr = new GlidesoftGlideAttributesImpl();
  attr.addAttribute("unload_date", GlideSysDateUtil.getUMTDateTimeString());
  hd.startElement("", "", "unload", attr);
  // 		Update Set
  var recordSerializer = new GlideRecordXMLSerializer();
  recordSerializer.setApplySecurity(true);
  recordSerializer.serialize(
    remoteUpdateSetGR,
    hd,
    new Packages.java.lang.String("INSERT_OR_UPDATE")
  );

  // 		XML Rows
  var child = new GlideRecord("sys_update_xml");
  child.addQuery("remote_update_set", remoteID);
  child.query();
  while (child.next()) {
    recordSerializer.setApplySecurity(true);
    recordSerializer.serialize(
      child,
      hd,
      new Packages.java.lang.String("INSERT_OR_UPDATE")
    );
  }

  // 		close and set XML footers
  hd.endElement("", "", "unload");
  hd.endDocument();
  outputStream.close();
  return outputStream.toString();
}
