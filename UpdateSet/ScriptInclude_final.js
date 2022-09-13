var UpdateSetUtil = Class.create();
UpdateSetUtil.prototype = {
  initialize: function () {},
  exportUpdateSet: function (localRec) {
    // 		instantiate update set export library
    var updateSetExport = new UpdateSetExport();
    var retrSetID = updateSetExport.exportUpdateSet(localRec); // the export library returns a sys_id  for the created export
    return retrSetID;
  },
  getUpdateSetText: function (recID) {
    // 		get GR of Remote Update Set
    var result = "";
    var remoteUpdateSetGR = new GlideRecord("sys_remote_update_set");
    // var remoteUpdateSet = remoteUpdateSetGR.get(remoteID);
    remoteUpdateSetGR.get(recID);
    // 		Add header
    var tf =
      Packages.javax.xml.transform.sax.SAXTransformerFactory.newInstance();
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
    child.addQuery("remote_update_set", recID);
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
    result = outputStream.toString();
    return result;
  },
  serializeRecord: function (record) {
    // 		Add header
    var tf =
      Packages.javax.xml.transform.sax.SAXTransformerFactory.newInstance();
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
      record,
      hd,
      new Packages.java.lang.String("INSERT_OR_UPDATE")
    );

    // 		XML Rows
    var child = new GlideRecord("sys_update_xml");
    child.addQuery("remote_update_set", record.sys_id);
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
  },
  type: "UpdateSetUtil",
};
