# Planter

GitLab/GitHub上でUML図を使った議論を可能にするChrome拡張、Planterを作成しました。

# 1.Planterって何？
* PlantUMLサーバーと連携し、 GitLab/GitHubのイシュー、Markdownファイル等に埋め込まれたUML図を描画します。
* Chromeの拡張です。
* オープンソースです。(作者はほとんど時間がないので、適当な出来です。改善のお手伝いをください）

# 2.Planterが解決する問題
こんな方にオススメです。

* GitHub/GitLabのイシューやプルリク(MR)の議論でUML図を使いたい!!
* Markdownファイルに記載したPlantUMLの図をGitHubやGitLab上でも見たい。

>詳しい方はgitlab.comのサーバーには既にPlantUMLが組み込まれており、[Markdown記法でUMLを記載する](https://docs.gitlab.com/ee/administration/integration/plantuml.html)ことが可能なことをご存知でしょう。しかし、オンプレミスで動作させているGitLabサーバーは複雑な設定をする必要がありますし、[こちら](https://qiita.com/kitfactory/items/2fde799fa092f0d8f0f1)で紹介したようなMarkdown Preview Enhancedプラグインで記載したUMLは見ることはできません。本稿は、こういった問題を解決します。

# 3.Planterの使い方
## 3.1.Planterのインストール
* Chrome拡張ストアに行きます。
* Planterをインストールします。

## 3.2.PlantUMLサーバーの設置
次にPlantUMLサーバーを立てます。[Apache Tomcat](http://tomcat.apache.org/)などのJ2EEサーバーが必要です。tomcatのインストールはzipを解凍するだけです。

つぎにPlantUMLサーバーアプリのダウンロードです。以下から、warファイルをダウンロードしてください。

[PlantUML J2EE warファイル](http://sourceforge.net/projects/plantuml/files/plantuml.war/download)

こちらのwarファイルをtomcatを解凍したwebappsの中にwarファイルをコピーします。

$ apache-tomcat<br>
├── bin<br>
├── webapps (ここにwarファイルをコピー)<br>
....

その後、tomcatを解凍したbinフォルダの中のstartupで起動します。

```
>cd bin
>startup.sh

```

## 3.3.Planterの設定

chrome://extensionsを開き、オプションから設定をします。

<img src="https://qiita-image-store.s3.amazonaws.com/0/35954/cddf0425-e727-61d1-9098-d467402f7956.png" width=540>

<img src="https://qiita-image-store.s3.amazonaws.com/0/35954/c5a08eb3-0ab1-03f9-8777-41a8492eeb30.png" width=700>

Planterは標準でGitHub/GitLabを __本家のPlantUML__ でレンダリングするようになっています。標準でも動作をしないわけではないですが、本家PlantUMLサーバーはお試しとして、 __必ず自前サーバーで設定して使用してください。__ 

# 4.使ってみよう！

イシューやマークダウンファイルでUMLを記載してみましょう。以下のように記載します。

\`\`\`plantuml
@startuml
PlantUMLのコンテンツ
@enduml
\`\`\`

つまり、[Markdown Preview Enhanced](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)で記述したコードブロックを記載することができます。今までマークダウンで、いろいろなUMLを描いていると思いますが、それをGitLab/GitHub上で見ることが出来ます。

すると、

__GitLab__
<br>

<img src="https://qiita-image-store.s3.amazonaws.com/0/35954/f8fe2c59-a9bf-4ac8-a2b9-357767b3d83b.png" width=640>


__GitHub__
<br>

<img src="https://qiita-image-store.s3.amazonaws.com/0/35954/bbe95c74-c5c4-2113-fc18-98c97d5c625f.png" width=640>


# 5.PlanterはOSSです。

PlanterはGitHub上に公開されたOSSです。GitHubの[こちら](https://github.com/kitfactory/Planter)をご参照ください。Planterは都元ダイスケさんの[pegmatite](https://github.com/dai0304/pegmatite)や小飼弾さんの[js-deflate](https://github.com/dankogai/js-deflate)によってなりたっています。(自分は見事に何もやってません。）その恩恵を皆さんと分かちあいたいと思います。雑な出来で何とかクリスマスに間に合ったレベルですが、皆さんのプルリクエストをお待ちしています。

個人的にもまだreloadしないとたまに画像が出ないとか少し直したいと思ってますが、ちょいちょい直してあげてください。

[参照](https://qiita.com/kitfactory)