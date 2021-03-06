/*******************************************************************************
 * Copyright 2019 France Labs
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *******************************************************************************/
package com.francelabs.datafari.simplifiedui.utils;

import java.util.ArrayList;
import java.util.List;

import com.francelabs.datafari.simplifiedui.utils.FilerFilterRule.FilterType;
import com.francelabs.datafari.simplifiedui.utils.FilerFilterRule.RuleType;

public class FilerJob {

  private String repositoryConnection;
  private String paths;
  private boolean security = false;
  private final List<FilerFilterRule> orderedFilterRules = new ArrayList<>();

  public FilerJob() {
    // Set default exclude rules
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "/thumbs.db"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "/desktop.ini"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "/~*"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.lnk"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.mat"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.odb"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.zip"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.gz"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.rar"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.bz2"));
    orderedFilterRules.add(new FilerFilterRule(RuleType.EXCLUDE, FilterType.FILE, "*.7z"));
  }

  public String getRepositoryConnection() {
    return repositoryConnection;
  }

  public void setRepositoryConnection(final String repositoryConnection) {
    this.repositoryConnection = repositoryConnection;
  }

  public String getPaths() {
    return paths;
  }

  public void setPaths(final String paths) {
    this.paths = paths;
  }

  public boolean isSecurity() {
    return security;
  }

  public void setSecurity(final boolean security) {
    this.security = security;
  }

  public List<FilerFilterRule> getOrderedRules() {
    return orderedFilterRules;
  }

}
