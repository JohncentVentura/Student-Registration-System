'Imports System.Data.Common
Imports System.Data.OleDb
'Imports System.Windows.Forms.VisualStyles.VisualStyleElement

Public Class Form2
    Dim connectionstring As String
    Dim dbconnection As OleDbConnection
    Dim dbadapter As New OleDbDataAdapter
    Dim dbdataset As New DataSet
    Private Sub Form2_FormClosed(sender As Object, e As FormClosedEventArgs) Handles Me.FormClosed
        Me.Hide()
        MainForm.Show()
        MainForm.Enabled() = True
    End Sub

    Private Sub Form2_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.Text = "Subject Registration"
        DisplayNorm()

        'Add-ons
        DataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill
    End Sub

    Private Sub DisplayNorm()
        Label1.Text = "Subject Code"
        Label2.Text = "Description"
        Label3.Text = "Units"
        Button1.Text = "Add"
        Button2.Text = "Edit"
        Button3.Text = "Delete"
        Button1.Enabled = True
        Button2.Enabled = True
        Button3.Enabled = True
        TextBox1.Enabled = False
        TextBox2.Enabled = False
        TextBox3.Enabled = False
        TextBox1.Text = vbNullString
        TextBox2.Text = vbNullString
        TextBox3.Text = vbNullString

        DataGridView1.AllowUserToAddRows = False
        connectionstring = "Provider=Microsoft.Jet.OLEDB.4.0; Data Source = student.mdb;"
        dbconnection = New OleDbConnection(connectionstring)
        Try
            dbconnection.Open()
            dbdataset.Clear()
            dbadapter = New OleDbDataAdapter("Select * from Subject", connectionstring)
            dbadapter.Fill(dbdataset, "Subject")
            DataGridView1.DataSource = dbdataset.Tables("Subject").DefaultView
            dbconnection.Close()
            Label4.Text = "Connected"
            Label4.ForeColor = Color.LimeGreen
        Catch ex As Exception
            Label4.Text = "Disconnected"
            Label4.ForeColor = Color.Red
        End Try
    End Sub
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Button1.Text = "Add" Then
            Button1.Enabled = False
            Button2.Text = "Save"
            Button3.Text = "Cancel"
            TextBox1.Text = vbNullString
            TextBox2.Text = vbNullString
            TextBox3.Text = vbNullString
            TextBox1.Enabled = True
            TextBox2.Enabled = True
            TextBox3.Enabled = True
            DataGridView1.AllowUserToAddRows = True
        ElseIf Button1.Text = "Save" Then
            dbconnection.Open()
            Dim dbcommand As New OleDbCommand("UPDATE Subject Set 
                DESCRIPTION = '" & TextBox2.Text.Trim & "', 
                UNITS = '" & TextBox3.Text.Trim & "' 
                WHERE SUBJECT_CODE = '" & TextBox1.Text.Trim & "' ", dbconnection)
            dbcommand.ExecuteNonQuery()
            dbcommand.Dispose()
            dbconnection.Close()
            DisplayNorm()
            MsgBox("Record Save", vbInformation, "Update")
        End If
    End Sub

    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        If Button2.Text = "Edit" Then
            Button2.Enabled = False
            Button1.Text = "Save"
            Button3.Text = "Cancel"
            TextBox1.Enabled = True
            TextBox2.Enabled = True
            TextBox3.Enabled = True
        ElseIf Button2.Text = "Save" Then
            If (TextBox1.Text <> vbNullString And TextBox2.Text <> vbNullString) Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("INSERT INTO Subject (SUBJECT_CODE, DESCRIPTION, UNITS) 
                    VALUES ('" + TextBox1.Text.Trim + "','" + TextBox2.Text.Trim + "','" + TextBox3.Text.Trim + "')", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Successful", vbInformation, "Add Record")
            ElseIf (TextBox1.Text = vbNullString) Then
                MsgBox("Enter Subject_Code", vbCritical, "Missing")
            ElseIf (TextBox2.Text = vbNullString) Then
                MsgBox("Enter Description", vbCritical, "Missing")
            End If
        ElseIf Button2.Text = "Cancel" Then
            DisplayNorm()
        End If
    End Sub

    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        If Button3.Text = "Delete" Then
            Button1.Enabled = False
            Button2.Enabled = False
            Button3.Enabled = False
            Dim Response = MsgBox("Are you sure to delete the record?", vbYesNo, "Confirmation")
            If Response = vbYes Then
                dbconnection.Open()
                Dim dbcommand As New OleDbCommand("DELETE FROM Subject WHERE SUBJECT_CODE = '" & TextBox1.Text.Trim & "' ", dbconnection)
                dbcommand.ExecuteNonQuery()
                dbcommand.Dispose()
                dbconnection.Close()
                DisplayNorm()
                MsgBox("Record was permanently deleted", vbInformation, "Successful")
            Else
                DisplayNorm()
            End If
        Else
            DisplayNorm()
        End If
    End Sub

    Private Sub DataGridView1_CellClick(sender As Object, e As DataGridViewCellEventArgs) Handles DataGridView1.CellClick
        TextBox1.Text = DataGridView1.CurrentRow.Cells(0).Value
        TextBox2.Text = DataGridView1.CurrentRow.Cells(1).Value
        TextBox3.Text = DataGridView1.CurrentRow.Cells(2).Value

    End Sub

End Class