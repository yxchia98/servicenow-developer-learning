// inside flow designer, script step of action
(function execute(inputs, outputs) {
  // ... code ...
  var localRec = new GlideRecord("sys_update_set");
  localRec.get(inputs.LocalSetID);
  var usp = new UpdateSetUtil();
  var remoteID = usp.exportUpdateSet(localRec);
  var updateSetText = usp.getUpdateSetText(remoteID);
  outputs.update_set_xml_string = updateSetText;
})(inputs, outputs);
